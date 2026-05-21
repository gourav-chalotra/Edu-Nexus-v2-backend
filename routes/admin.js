import express from 'express';
import {
  createTeacher,
  getTeachers,
  deleteTeacher,
  getClassPerformance,
} from '../controllers/adminController.js';
import { protect, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply auth protection & admin check to all admin routes
router.use(protect, isAdmin);

router.post('/teachers', createTeacher);
router.get('/teachers', getTeachers);
router.delete('/teachers/:id', deleteTeacher);
router.get('/performance/:classLevel', getClassPerformance);

export default router;
