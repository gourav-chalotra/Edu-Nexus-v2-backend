import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import connectDB from './config/db.js';
import User from './models/User.js';
import { initSocket } from './socket.js';

// Route files
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import teacherRoutes from './routes/teacher.js';
import studentRoutes from './routes/student.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();
const server = http.createServer(app);

// Initialize sockets
initSocket(server);

// Middlewares
const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: frontendOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Default API health status route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduNexus API is running smoothly' });
});

// Mount router modules
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// Mock /api/users endpoint for frontend example integration
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice Smith', role: 'Student', email: 'alice@example.com' },
    { id: 2, name: 'Bob Jones', role: 'Teacher', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', role: 'Admin', email: 'charlie@example.com' }
  ]);
});

// Seed default Admin Account if not present
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@edunexus.com',
        password: 'admin123', // Will be hashed automatically by user pre-save hook
        role: 'admin',
      });
      console.log('----------------------------------------------------');
      console.log('SEED DATA: Default Admin Account Created!');
      console.log('Email: admin@edunexus.com');
      console.log('Password: admin123');
      console.log('----------------------------------------------------');
    } else {
      console.log('Default Admin Account already exists.');
    }
  } catch (error) {
    console.error('Error seeding default admin account:', error.message);
  }
};

// Seed admin after connection
setTimeout(seedAdmin, 5000); // Small timeout to ensure Mongoose finishes connection setup

// Handle 404 page not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource API endpoint not found.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`EduNexus Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});
