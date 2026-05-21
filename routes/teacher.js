import express from 'express';
import {
  addChapter,
  getTeacherChapters,
  deleteChapter,
  addQuiz,
  getTeacherQuizzes,
  deleteQuiz,
  getAssignedClassPerformance,
  generateQuiz,
} from '../controllers/teacherController.js';
import { protect, isTeacher } from '../middleware/auth.js';

const router = express.Router();

// Apply auth protection & teacher check to all teacher routes
router.use(protect, isTeacher);

router.post('/chapters', addChapter);
router.get('/chapters', getTeacherChapters);
router.delete('/chapters/:id', deleteChapter);

router.post('/quizzes', addQuiz);
router.get('/quizzes', getTeacherQuizzes);
router.delete('/quizzes/:id', deleteQuiz);

router.get('/performance', getAssignedClassPerformance);

router.post('/generate-quiz', generateQuiz);

export default router;
