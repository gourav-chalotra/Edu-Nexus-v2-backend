import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Route protector for authenticated sessions
export const protect = async (req, res, next) => {
  let token;

  // Read token from Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database, omit password
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found, authorization failed.' });
      }

      next();
    } catch (error) {
      console.error('JWT Token Verification Error:', error);
      return res.status(401).json({ message: 'Not authorized, token validation failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

// Check if user is Admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin role required.' });
  }
};

// Check if user is Teacher
export const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Teacher role required.' });
  }
};

// Check if user is Student
export const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Student role required.' });
  }
};
