import express from 'express';
import {
  updateProfile,
  getChaptersBySubject,
  getQuizzesBySubject,
  submitQuizAttempt,
  getSubmissions,
  getLeaderboard,
} from '../controllers/studentController.js';
import { protect, isStudent } from '../middleware/auth.js';

const router = express.Router();

// Apply auth protection & student check to all student routes
router.use(protect, isStudent);

router.put('/profile', updateProfile);
router.get('/chapters/:subject', getChaptersBySubject);
router.get('/quizzes/:subject', getQuizzesBySubject);
router.post('/quizzes/:id/submit', submitQuizAttempt);
router.get('/submissions', getSubmissions);
router.get('/leaderboard', getLeaderboard);

export default router;
