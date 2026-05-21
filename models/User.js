import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: true,
    },
    // Student specific fields
    classLevel: {
      type: String,
      enum: ['6', '7', '8', '9', '10'],
      required: function() {
        return this.role === 'student';
      },
    },
    rollNo: {
      type: String,
      required: function() {
        return this.role === 'student';
      },
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    profilePic: {
      type: String, // base64 string or placeholder identifier
      default: 'avatar_1',
    },
    xp: {
      type: Number,
      default: 0, // Experience Points
    },
    level: {
      type: Number,
      default: 1, // Current level
    },
    badges: {
      type: [String], // e.g. ['math_master', 'speed_runner', 'perfect_score']
      default: [],
    },
    
    // Teacher specific fields
    assignedSubject: {
      type: String,
      enum: ['English', 'Maths', 'Science', 'General Knowledge', 'Computer'],
      required: function() {
        return this.role === 'teacher';
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
