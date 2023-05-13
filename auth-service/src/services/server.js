// Global Requirements
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/routes');
dotenv.config();
const crypto = require('crypto');
const User = require('../models/User');
const connectDB = require('./db');
const mongoose = require('mongoose');


// Server
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api', authRoutes);

app.get('/generate-key', (req, res) => {
  const secretKey = crypto.randomBytes(64).toString('hex');
  res.json({ secretKey });
});

// Connecting to MongoDB
connectDB(process.env.MONGODB_URI, process.env.PORT, app);


const generateToken = require('../test/tokenGenerator');

// Call the generateToken function
const token = generateToken();

// Print the generated token
console.log('Generated Token:', token);




