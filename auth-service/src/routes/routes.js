// Global Requirements
const express = require('express');
const router = express.Router();
const axios = require('axios');

const { signUp, login } = require('../controllers/Controller');
// Verify Token
const { verifyToken } = require('../utils/middleware');

// User signUp & Login Routes
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Make a request to the authentication service for signup
    const response = await axios.post('http://localhost:<auth-service-port>/signup', { email, password });
    // Return the response from the authentication service
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Make a request to the authentication service for login
    const response = await axios.post('http://localhost:<auth-service-port>/login', { email, password });
    // Return the response from the authentication service
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

router.get('/api/protected', async (req, res) => {
  try {
    // Make a request to the authentication service for protected route access
    const response = await axios.get('http://localhost:<auth-service-port>/api/protected', {
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
    const response = await axios.get('http://localhost:<question-bank-service-port>/questions', { params: req.query });
    // Return the response from the question-bank-service
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'An error occurred while fetching questions' });
  }
});

module.exports = router;
