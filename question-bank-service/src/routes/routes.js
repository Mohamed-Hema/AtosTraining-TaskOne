// Global Requirements
const express = require('express');
const router = express.Router();
const {
  authMiddleware,
  isTeacher,
  isAdmin,
  isNotStudent
} = require('../middlewares/authMiddleware');
const {
  createQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestion,
  addAnswer,
  deleteAnswer,
  deleteQuestion
} = require('../controllers/controllers');

// Get all questions
router.get('/questions', authMiddleware, getAllQuestions);

// Create new question
router.post('/questions', authMiddleware, isTeacher, createQuestion);


// Get question by ID
router.get('/questions/:questionId', getQuestionById);

// Update question
router.put('/questions/:questionId', authMiddleware, isTeacher, updateQuestion);

// Add answer for existing question
router.post('/questions/:questionId/answers', authMiddleware, isTeacher, addAnswer);

// Delete answer for existing question
router.delete('/questions/:questionId/answers/:answerId', authMiddleware, isTeacher, deleteAnswer);

// Delete question
router.delete('/questions/:questionId', authMiddleware, isAdmin, deleteQuestion);

module.exports = router;
