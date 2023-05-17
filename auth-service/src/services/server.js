// Global Requirements
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/routes');
dotenv.config();
const crypto = require('crypto');
const {User, comparePassword} = require('../models/User');
const connectDB = require('./db');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

// Server
const app = express();

// Middleware
app.use(express.json());
app.use('/api', authRoutes);

app.get('/generate-key', (req, res) => {
  const secretKey = crypto.randomBytes(64).toString('hex');
  res.json({ secretKey });
});

// Sign Up Function
app.post('/api/signup', async (req, res) => {
  // Validate the request body
  const { username, password, userType } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Check if the username already exists
  const user = await User.findOne({ username });
  if (user) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  // Create a new user
  const newUser = new User({
    username,
    password,
    userType
  });
  await newUser.save();

  // Generate a JWT token for the new user
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

  // Return the JWT token in the response
  res.json({ token });
});

// Login Function
app.post('/api/login', async (req, res) => {
  // Validate the request body
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await comparePassword(password);
    if (passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Return the JWT token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Connecting to MongoDB
connectDB(process.env.MONGODB_URI, process.env.PORT, app);
const user = {
  _id: 'user_id',
  username: 'username',
  userType: 'userType'
};

const generateToken = require('../test/tokenGenerator');

// Call the generateToken function
const token = generateToken(user);

// Print the generated token
console.log('Generated Token:', token);