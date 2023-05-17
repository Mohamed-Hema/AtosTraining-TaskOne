// Global Requirements
const express = require('express');
const router = express.Router();
const axios = require('axios');

const { signUp, login } = require('../controllers/Controller');
// Verify Token
const { verifyToken } = require('../utils/middleware');

// User signUp & Login Routes
// router.post('/api/signup', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // Make a request to the authentication service for signup
//     const response = await axios.post('/api/signup', { username, password });
//     // Return the response from the authentication service
//     res.json(response.data);
//   } catch (error) {
//     // Log the error details to the console
//     console.error('Error during signup:', error);
//     // Send the actual error message in the response
//     res.status(500).json({ error: error.message });
//   }
// });

// User signUp & Login Routes
router.post('/api/signup', async (req, res) => {
  try {
    // Make a request to the authentication service for signup
    const response = await axios.post('/api/signup', { username, password });
    // Return the response from the authentication service
    res.json(response.data);
  } catch (error) {
    // Log the error details to the console
    console.error('Error during signup:', error);
    // Send the actual error message in the response
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Validate the password
    const isPasswordValid = await validatePassword(password, user.password);

    // If the passwords don't match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

router.get('/api/protected', async (req, res) => {
  try {
    // Make a request to the authentication service for protected route access
    const response = await axios.get('/api/protected', {
      headers: {
        Authorization: req.headers.authorization, // Pass the authorization token
      },
    });
    // Return the response from the authentication service
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred while accessing the protected route' });
  }
});

router.get('/questions', async (req, res) => {
  try {
    // Make a request to the question-bank-service questions endpoint
    const response = await axios.get(`${process.env.QUESTION_BANK_QUESTIONS}`, { params: req.query });
    // Return the response from the question-bank-service
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred while fetching questions' });
  }
});

module.exports = router;
