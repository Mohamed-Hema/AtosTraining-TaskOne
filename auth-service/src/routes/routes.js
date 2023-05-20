// Global Requirements
const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/Controller');

// Sign users up
router.post("/signup", signUp);

// Sign users in
router.post("/login", login);

module.exports = router;
