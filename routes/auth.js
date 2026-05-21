import express from 'express';
import {
  registerStudent,
  loginUser,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register-student', registerStudent);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
