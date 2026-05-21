import Chapter from '../models/Chapter.js';
import Quiz from '../models/Quiz.js';
import Submission from '../models/Submission.js';
import User from '../models/User.js';
import { generateQuizQuestions } from '../quizGenerator.js';

// Helper to extract YouTube video ID from a URL
const getYoutubeId = (url) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

// @desc    Add a chapter with video link and notes
// @route   POST /api/teacher/chapters
// @access  Private/Teacher
export const addChapter = async (req, res) => {
  const { title, description, classLevel, videoLink, notes } = req.body;
  const subject = req.user.assignedSubject;

  try {
    if (!title || !description || !classLevel || !videoLink) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const videoId = getYoutubeId(videoLink);

    const chapter = await Chapter.create({
      title,
      description,
      subject,
      classLevel,
      videoLink: videoId,
      notes: notes || '',
      teacher: req.user._id,
    });

    res.status(201).json(chapter);
  } catch (error) {
    console.error('Add chapter error:', error);
    res.status(500).json({ message: 'Server error adding chapter.' });
  }
};

// @desc    Get chapters uploaded by teacher
// @route   GET /api/teacher/chapters
// @access  Private/Teacher
export const getTeacherChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ teacher: req.user._id });
    res.json(chapters);
  } catch (error) {
    console.error('Get teacher chapters error:', error);
    res.status(500).json({ message: 'Server error retrieving chapters.' });
  }
};

// @desc    Delete a chapter
// @route   DELETE /api/teacher/chapters/:id
// @access  Private/Teacher
export const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found.' });
    }
    if (chapter.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this chapter.' });
    }
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chapter deleted successfully.' });
  } catch (error) {
    console.error('Delete chapter error:', error);
    res.status(500).json({ message: 'Server error deleting chapter.' });
  }
};

// @desc    Add a quiz with multiple choice questions
// @route   POST /api/teacher/quizzes
// @access  Private/Teacher
export const addQuiz = async (req, res) => {
  const { title, classLevel, questions } = req.body;
  const subject = req.user.assignedSubject;

  try {
    if (!title || !classLevel || !questions || !questions.length) {
      return res.status(400).json({ message: 'Please provide title, class level and questions.' });
    }

    const quiz = await Quiz.create({
      title,
      subject,
      classLevel,
      teacher: req.user._id,
      questions,
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Add quiz error:', error);
    res.status(500).json({ message: 'Server error adding quiz.' });
  }
};

// @desc    Get quizzes uploaded by teacher
// @route   GET /api/teacher/quizzes
// @access  Private/Teacher
export const getTeacherQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.user._id });
    res.json(quizzes);
  } catch (error) {
    console.error('Get teacher quizzes error:', error);
    res.status(500).json({ message: 'Server error retrieving quizzes.' });
  }
};

// @desc    Delete a quiz
// @route   DELETE /api/teacher/quizzes/:id
// @access  Private/Teacher
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }
    if (quiz.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this quiz.' });
    }
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz deleted successfully.' });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ message: 'Server error deleting quiz.' });
  }
};

// @desc    Get performance of the teacher's assigned classes
// @route   GET /api/teacher/performance
// @access  Private/Teacher
export const getAssignedClassPerformance = async (req, res) => {
  const subject = req.user.assignedSubject;

  try {
    // 1. Fetch all submissions for the teacher's assigned subject
    const submissions = await Submission.find({ subject })
      .populate('student', 'name rollNo email classLevel xp level')
      .populate('quiz', 'title')
      .lean();

    // 2. Group submissions by classLevel (6, 7, 8, 9, 10)
    const classPerformance = {
      '6': [],
      '7': [],
      '8': [],
      '9': [],
      '10': [],
    };

    submissions.forEach((sub) => {
      if (sub.student && sub.student.classLevel && classPerformance[sub.student.classLevel]) {
        classPerformance[sub.student.classLevel].push({
          submissionId: sub._id,
          studentName: sub.student.name,
          rollNo: sub.student.rollNo,
          quizTitle: sub.quiz ? sub.quiz.title : 'Deleted Quiz',
          score: sub.score,
          totalPoints: sub.totalPoints,
          percentage: sub.totalPoints > 0 ? Math.round((sub.score / sub.totalPoints) * 100) : 0,
          completedAt: sub.createdAt,
        });
      }
    });

    // 3. Calculate summary metrics for each class level
    const summary = {};
    Object.keys(classPerformance).forEach((classLvl) => {
      const attempts = classPerformance[classLvl];
      const totalAttempts = attempts.length;
      const avgPercentage =
        totalAttempts > 0
          ? Math.round(attempts.reduce((sum, att) => sum + att.percentage, 0) / totalAttempts)
          : 0;

      summary[classLvl] = {
        totalAttempts,
        averagePercentage: avgPercentage,
      };
    });

    res.json({
      subject,
      classPerformance,
      summary,
    });
  } catch (error) {
    console.error('Get teacher performance error:', error);
    res.status(500).json({ message: 'Server error retrieving class performance statistics.' });
  }
};

// @desc    AI Generate quiz questions from topic
// @route   POST /api/teacher/generate-quiz
// @access  Private/Teacher
export const generateQuiz = async (req, res) => {
  const { topic, count } = req.body;
  const subject = req.user.assignedSubject;

  try {
    if (!topic) {
      return res.status(400).json({ message: 'Please provide a topic to generate questions.' });
    }

    const numQuestions = Math.min(Math.max(parseInt(count) || 5, 1), 15);
    const result = generateQuizQuestions(subject, topic, numQuestions);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      topic: result.matchedTopic,
      subject,
      questions: result.questions,
    });
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({ message: 'Server error generating quiz questions.' });
  }
};
