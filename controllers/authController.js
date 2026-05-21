import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register-student
// @access  Public
export const registerStudent = async (req, res) => {
  const { name, email, password, classLevel, rollNo, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const student = await User.create({
      name,
      email,
      password,
      role: 'student',
      classLevel,
      rollNo,
      phone: phone || '',
      xp: 0,
      level: 1,
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        classLevel: student.classLevel,
        rollNo: student.rollNo,
        phone: student.phone,
        xp: student.xp,
        level: student.level,
        profilePic: student.profilePic,
        badges: student.badges,
        token: generateToken(student._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid student data received.' });
    }
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Server error during student registration.' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        classLevel: user.classLevel,
        rollNo: user.rollNo,
        phone: user.phone,
        xp: user.xp,
        level: user.level,
        profilePic: user.profilePic,
        badges: user.badges,
        assignedSubject: user.assignedSubject,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error getting profile data.' });
  }
};
