// Global Requirements
const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/Controller');
//Verify Token
const { verifyToken } = require('../utils/middleware');


router.post('/verify-token', verifyToken, (req, res) => {
  // Return user information
  res.json({ user: req.user });
});

// User signUp & Login Routes
router.post('/signup', verifyToken, signUp);

router.post('/login', login);

// Example protected route
router.get('/api/protected', verifyToken, (req, res) => {
    // Handle the protected route logic
    res.json({ message: 'Protected route accessed successfully' });
  });


router.get('/questions', async (req, res) => {
  try {
    // Make a request to the question-bank-service questions endpoint
    const response = await questionBankService.get('/questions', { params: req.query });
    // Return Results
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred while fetching questions' });
  }
});
  
module.exports = router;

