import User from '../models/User.js';
import Chapter from '../models/Chapter.js';
import Quiz from '../models/Quiz.js';
import Submission from '../models/Submission.js';

// Helper to compute level from XP
// Level 1: 0 - 299 XP
// Level 2: 300 - 599 XP
// Level 3: 600 - 899 XP, etc.
const calculateLevel = (xp) => {
  return Math.floor(xp / 300) + 1;
};

// @desc    Update student profile details
// @route   PUT /api/student/profile
// @access  Private/Student
export const updateProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id);

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }

    // Keep email unique checking if they want to change email
    if (req.body.email && req.body.email.toLowerCase() !== student.email) {
      const emailExists = await User.findOne({ email: req.body.email.toLowerCase() });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already taken by another account.' });
      }
      student.email = req.body.email.toLowerCase();
    }

    student.name = req.body.name || student.name;
    student.phone = req.body.phone !== undefined ? req.body.phone : student.phone;
    student.rollNo = req.body.rollNo !== undefined ? req.body.rollNo : student.rollNo;
    student.profilePic = req.body.profilePic || student.profilePic;

    // Optional: allow student to update class level, but keep existing level if not specified
    if (req.body.classLevel) {
      student.classLevel = req.body.classLevel;
    }

    const updatedStudent = await student.save();

    res.json({
      _id: updatedStudent._id,
      name: updatedStudent.name,
      email: updatedStudent.email,
      role: updatedStudent.role,
      classLevel: updatedStudent.classLevel,
      rollNo: updatedStudent.rollNo,
      phone: updatedStudent.phone,
      xp: updatedStudent.xp,
      level: updatedStudent.level,
      profilePic: updatedStudent.profilePic,
      badges: updatedStudent.badges,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating student profile.' });
  }
};

// @desc    Get chapters by subject for student class level
// @route   GET /api/student/chapters/:subject
// @access  Private/Student
export const getChaptersBySubject = async (req, res) => {
  const { subject } = req.params;
  const classLevel = req.user.classLevel;

  try {
    const chapters = await Chapter.find({ subject, classLevel })
      .populate('teacher', 'name')
      .sort({ createdAt: 1 });
    res.json(chapters);
  } catch (error) {
    console.error('Get student chapters error:', error);
    res.status(500).json({ message: 'Server error retrieving chapters.' });
  }
};

// @desc    Get quizzes by subject and merge with student's best score
// @route   GET /api/student/quizzes/:subject
// @access  Private/Student
export const getQuizzesBySubject = async (req, res) => {
  const { subject } = req.params;
  const classLevel = req.user.classLevel;

  try {
    // Fetch all quizzes for class and subject
    const quizzes = await Quiz.find({ subject, classLevel })
      .populate('teacher', 'name')
      .lean();

    // Fetch student's submissions for these quizzes
    const quizIds = quizzes.map((q) => q._id);
    const submissions = await Submission.find({
      student: req.user._id,
      quiz: { $in: quizIds },
    }).lean();

    // Attach student submission info to quizzes
    const quizzesWithScores = quizzes.map((quiz) => {
      const quizSubmissions = submissions.filter(
        (sub) => sub.quiz.toString() === quiz._id.toString()
      );

      const maxScore =
        quizSubmissions.length > 0
          ? Math.max(...quizSubmissions.map((s) => s.score))
          : null;

      const totalQuizPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 10), 0);

      return {
        ...quiz,
        totalPoints: totalQuizPoints,
        hasAttempted: quizSubmissions.length > 0,
        bestScore: maxScore,
        attemptsCount: quizSubmissions.length,
      };
    });

    res.json(quizzesWithScores);
  } catch (error) {
    console.error('Get student quizzes error:', error);
    res.status(500).json({ message: 'Server error retrieving quizzes.' });
  }
};

// @desc    Submit answers for a quiz, compute score, update XP and award badges
// @route   POST /api/student/quizzes/:id/submit
// @access  Private/Student
export const submitQuizAttempt = async (req, res) => {
  const quizId = req.params.id;
  const { answers } = req.body; // Array of selected option indices corresponding to quiz questions

  try {
    // 1. Load Quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: 'Invalid or incomplete answers array provided.' });
    }

    // 2. Grade quiz answers on backend
    let score = 0;
    let totalPoints = 0;

    quiz.questions.forEach((question, index) => {
      const qPoints = question.points || 10;
      totalPoints += qPoints;

      if (answers[index] === question.correctAnswerIndex) {
        score += qPoints;
      }
    });

    // 3. Compute Gamification Rewards
    let xpEarned = score; // 1 XP per point scored
    const completionBonus = 20; // 20 XP for attempting the quiz
    xpEarned += completionBonus;

    const isPerfectScore = score === totalPoints;
    const perfectScoreBonus = 50; // 50 XP bonus for scoring 100%
    if (isPerfectScore) {
      xpEarned += perfectScoreBonus;
    }

    // 4. Save Submission
    const submission = await Submission.create({
      student: req.user._id,
      quiz: quizId,
      score,
      totalPoints,
      subject: quiz.subject,
      classLevel: quiz.classLevel,
      xpEarned,
    });

    // 5. Update Student profile (XP, Level, Badges)
    const student = await User.findById(req.user._id);
    const oldXP = student.xp;
    student.xp += xpEarned;

    // Check level up
    const oldLevel = student.level;
    const newLevel = calculateLevel(student.xp);
    let levelUp = false;
    if (newLevel > oldLevel) {
      student.level = newLevel;
      levelUp = true;
    }

    // Badge awards logic
    const newBadges = [];

    // Check if this was their first submission
    const submissionCount = await Submission.countDocuments({ student: student._id });
    if (submissionCount === 1) {
      const badge = 'Pioneer';
      if (!student.badges.includes(badge)) {
        student.badges.push(badge);
        newBadges.push(badge);
      }
    }

    // Check if perfect score
    if (isPerfectScore) {
      const badge = 'Mastermind';
      if (!student.badges.includes(badge)) {
        student.badges.push(badge);
        newBadges.push(badge);
      }
    }

    // Subject specific explorer badges
    const subjectBadges = {
      English: 'Word Wizard',
      Maths: 'Math Legend',
      Science: 'Science Pioneer',
      'General Knowledge': 'Trivia Master',
      Computer: 'Code Knight',
    };

    const subjectBadgeName = subjectBadges[quiz.subject];
    if (subjectBadgeName && !student.badges.includes(subjectBadgeName)) {
      student.badges.push(subjectBadgeName);
      newBadges.push(subjectBadgeName);
    }

    // Award level milestone badges
    if (student.level >= 5 && !student.badges.includes('Scholar Elite')) {
      student.badges.push('Scholar Elite');
      newBadges.push('Scholar Elite');
    }

    await student.save();

    res.status(201).json({
      submission,
      xpEarned,
      isPerfectScore,
      levelUp,
      newLevel: student.level,
      newBadges,
      currentXp: student.xp,
      currentLevel: student.level,
      updatedBadges: student.badges,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ message: 'Server error processing quiz attempt.' });
  }
};

// @desc    Get historical submissions for student
// @route   GET /api/student/submissions
// @access  Private/Student
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate('quiz', 'title')
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Get student submissions error:', error);
    res.status(500).json({ message: 'Server error retrieving quiz history.' });
  }
};

// @desc    Get class leaderboard ordered by XP
// @route   GET /api/student/leaderboard
// @access  Private/Student
export const getLeaderboard = async (req, res) => {
  const classLevel = req.user.classLevel;

  try {
    const students = await User.find({ role: 'student', classLevel })
      .select('name rollNo xp level profilePic badges')
      .sort({ xp: -1 })
      .limit(10)
      .lean();

    res.json(students);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error retrieving leaderboard.' });
  }
};
