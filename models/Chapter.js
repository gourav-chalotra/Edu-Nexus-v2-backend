import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
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
    videoLink: {
      type: String, // YouTube URL or Video ID
      required: true,
    },
    notes: {
      type: String, // Text markdown notes or a document link
      default: '',
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model('Chapter', ChapterSchema);
export default Chapter;
