import User from '../models/User.js';
import Submission from '../models/Submission.js';

// @desc    Create a new teacher
// @route   POST /api/admin/teachers
// @access  Private/Admin
export const createTeacher = async (req, res) => {
  const { name, email, password, assignedSubject } = req.body;

  try {
    const teacherExists = await User.findOne({ email });

    if (teacherExists) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const teacher = await User.create({
      name,
      email,
      password,
      role: 'teacher',
      assignedSubject,
    });

    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role,
      assignedSubject: teacher.assignedSubject,
    });
  } catch (error) {
    console.error('Create teacher error:', error);
    res.status(500).json({ message: 'Server error creating teacher account.' });
  }
};

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private/Admin
export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json(teachers);
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ message: 'Server error retrieving teachers.' });
  }
};

// @desc    Delete a teacher
// @route   DELETE /api/admin/teachers/:id
// @access  Private/Admin
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ message: 'Teacher not found.' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Teacher deleted successfully.' });
  } catch (error) {
    console.error('Delete teacher error:', error);
    res.status(500).json({ message: 'Server error deleting teacher.' });
  }
};

// @desc    Get student performance class-wise
// @route   GET /api/admin/performance/:classLevel
// @access  Private/Admin
export const getClassPerformance = async (req, res) => {
  const { classLevel } = req.params;

  try {
    // 1. Get all students in this class
    const students = await User.find({ role: 'student', classLevel }).select('-password').lean();

    // 2. Fetch all submissions for these students
    const studentIds = students.map((s) => s._id);
    const submissions = await Submission.find({ student: { $in: studentIds } })
      .populate('quiz', 'title')
      .lean();

    // 3. Group submissions by student ID
    const studentPerformance = students.map((student) => {
      const studentSubmissions = submissions.filter(
        (sub) => sub.student.toString() === student._id.toString()
      );

      const totalScore = studentSubmissions.reduce((sum, sub) => sum + sub.score, 0);
      const totalPoints = studentSubmissions.reduce((sum, sub) => sum + sub.totalPoints, 0);
      const averagePercentage =
        totalPoints > 0 ? Math.round((totalScore / totalPoints) * 100) : 0;

      return {
        ...student,
        submissions: studentSubmissions,
        summary: {
          quizzesTaken: studentSubmissions.length,
          totalScore,
          totalPoints,
          averagePercentage,
        },
      };
    });

    // 4. Calculate class metrics
    const classTotalPercentage = studentPerformance.reduce(
      (sum, s) => sum + s.summary.averagePercentage,
      0
    );
    const classAveragePercentage =
      students.length > 0 ? Math.round(classTotalPercentage / students.length) : 0;

    res.json({
      classLevel,
      classAveragePercentage,
      totalStudents: students.length,
      students: studentPerformance,
    });
  } catch (error) {
    console.error('Get class performance error:', error);
    res.status(500).json({ message: 'Server error retrieving performance metrics.' });
  }
};
