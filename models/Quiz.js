import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [
      (val) => val.length >= 2,
      'A question must have at least 2 options.'
    ],
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
  },
  points: {
    type: Number,
    default: 10,
  },
});

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      enum: ['English', 'Maths', 'Science', 'General Knowledge', 'Computer'],
      required: true,
    },
    classLevel: {
      type: String,
      enum: ['6', '7', '8', '9', '10'],
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [QuestionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model('Quiz', QuizSchema);
export default Quiz;
