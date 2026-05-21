import { Server } from 'socket.io';

const activeRooms = new Map(); // teamCode -> roomState

const generateMathQuestion = () => {
  const operations = ['+', '-', '*', '/'];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let num1 = 0, num2 = 0, answer = 0;

  switch (op) {
    case '+':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      break;
    case '-':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * num1) + 1; // ensure positive result
      answer = num1 - num2;
      break;
    case '*':
      num1 = Math.floor(Math.random() * 12) + 2;
      num2 = Math.floor(Math.random() * 10) + 2;
      answer = num1 * num2;
      break;
    case '/':
      num2 = Math.floor(Math.random() * 9) + 2; // divisor from 2 to 10
      answer = Math.floor(Math.random() * 10) + 2; // quotient from 2 to 11
      num1 = num2 * answer; // dividend
      break;
  }

  return { questionStr: `${num1} ${op} ${num2}`, answer };
};

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join a room with a teamCode and nickname
    socket.on('join-game', ({ teamCode, nickname }) => {
      const code = teamCode.trim().toUpperCase();
      const name = nickname.trim();

      if (!code || !name) {
        socket.emit('error-msg', 'Invalid team code or nickname.');
        return;
      }

      let room = activeRooms.get(code);

      if (!room) {
        // Create new room
        room = {
          code,
          players: [],
          offset: 0, // starts in middle (0). Left is -5, Right is +5
          currentQuestion: null,
          status: 'waiting' // 'waiting', 'countdown', 'playing', 'ended'
        };
        activeRooms.set(code, room);
      }

      // Check if room is full
      if (room.players.length >= 2) {
        socket.emit('error-msg', 'Room is already full.');
        return;
      }

      // Check if nickname is taken
      if (room.players.some(p => p.nickname.toLowerCase() === name.toLowerCase())) {
        socket.emit('error-msg', 'Nickname is already taken in this lobby.');
        return;
      }

      const side = room.players.length === 0 ? 'left' : 'right';
      const player = { socketId: socket.id, nickname: name, side };
      room.players.push(player);
      socket.join(code);

      // Save room info to socket session
      socket.roomCode = code;
      socket.playerSide = side;

      console.log(`Player ${name} (${side}) joined room ${code}`);

      // Broadcast update to players in room
      io.to(code).emit('lobby-update', {
        players: room.players.map(p => ({ nickname: p.nickname, side: p.side }))
      });

      // Start the game if 2 players are present
      if (room.players.length === 2) {
        room.status = 'countdown';
        io.to(code).emit('game-init', {
          players: room.players.map(p => ({ nickname: p.nickname, side: p.side }))
        });

        // Trigger 3s countdown
        let count = 3;
        const countdownInterval = setInterval(() => {
          io.to(code).emit('countdown', count);
          count--;
          if (count < 0) {
            clearInterval(countdownInterval);
            
            // Generate first question
            room.currentQuestion = generateMathQuestion();
            room.status = 'playing';
            io.to(code).emit('game-start', {
              question: room.currentQuestion.questionStr,
              offset: room.offset
            });
          }
        }, 1000);
      }
    });

    // Handle answer submission
    socket.on('submit-answer', ({ answer }) => {
      const code = socket.roomCode;
      if (!code) return;

      const room = activeRooms.get(code);
      if (!room || room.status !== 'playing') return;

      const player = room.players.find(p => p.socketId === socket.id);
      if (!player) return;

      const parsedAnswer = parseInt(answer, 10);
      if (isNaN(parsedAnswer)) return;

      // Check if answer is correct
      if (parsedAnswer === room.currentQuestion.answer) {
        // Move the rope toward the correct player's side
        if (player.side === 'left') {
          room.offset -= 1;
        } else {
          room.offset += 1;
        }

        // Check if a checkpoint is crossed (win threshold: -5 or +5)
        if (room.offset <= -5) {
          room.status = 'ended';
          io.to(code).emit('game-over', {
            winner: room.players.find(p => p.side === 'left').nickname,
            offset: room.offset
          });
          activeRooms.delete(code);
        } else if (room.offset >= 5) {
          room.status = 'ended';
          io.to(code).emit('game-over', {
            winner: room.players.find(p => p.side === 'right').nickname,
            offset: room.offset
          });
          activeRooms.delete(code);
        } else {
          // Send new question
          room.currentQuestion = generateMathQuestion();
          io.to(code).emit('new-question', {
            question: room.currentQuestion.questionStr,
            offset: room.offset,
            solver: player.nickname
          });
        }
      } else {
        // Incorrect answer: optional minor penalty or feedback
        socket.emit('answer-feedback', { correct: false });
      }
    });

    // Handle socket disconnect
    socket.on('disconnect', () => {
      const code = socket.roomCode;
      if (code) {
        const room = activeRooms.get(code);
        if (room) {
          // Remove disconnecting player
          room.players = room.players.filter(p => p.socketId !== socket.id);
          
          if (room.players.length === 0) {
            activeRooms.delete(code);
          } else {
            // Notify the other player
            room.status = 'waiting';
            room.offset = 0; // reset rope
            io.to(code).emit('opponent-left', {
              message: 'Your opponent disconnected. Game reset.'
            });
            io.to(code).emit('lobby-update', {
              players: room.players.map(p => ({ nickname: p.nickname, side: p.side }))
            });
          }
        }
      }
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};
