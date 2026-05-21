import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
    },
    // Denormalized fields to make class/subject summaries very easy to query
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
    xpEarned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model('Submission', SubmissionSchema);
export default Submission;
