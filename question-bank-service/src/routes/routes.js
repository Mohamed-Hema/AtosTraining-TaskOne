// Global Requirements
const express = require('express');
const router = express.Router();
const { verifyToken, isTeacher, isAdmin, isNotStudent } = require('../middlewares/authMiddleware');
const {
    createQuestion,
    getQuestionById,
    getAllQuestions,
    updateQuestion,
    addAnswer,
    deleteAnswer,
    deleteQuestion,
  } = require('../controllers/controllers');

// Create new question
router.post('/', isTeacher, createQuestion);

// Get question by ID
router.get('/:questionId', getQuestionById);

// Get all questions
router.get('/', isNotStudent, getAllQuestions);

// Update question
router.put('/:questionId', isTeacher, updateQuestion);

// Add answer for existing question
router.post('/:questionId/answers', isTeacher, addAnswer);

// Delete answer for existing question
router.delete('/:questionId/answers/:answerId', isTeacher, deleteAnswer);

// Delete question
router.delete('/:questionId', isAdmin, deleteQuestion);

module.exports = router;
