// Global Requirements
const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/Controller');
//Verify Token
const { verifyToken } = require('../utils/middleware');


// User signUp & Login Routes
router.post('/signup', verifyToken, signUp);

router.post('/login', login);

// Example protected route
router.get('/api/protected', verifyToken, (req, res) => {
    // Handle the protected route logic
    res.json({ message: 'Protected route accessed successfully' });
  });

module.exports = router;

