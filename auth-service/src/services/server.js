// Global Requirements
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('../routes/routes');
dotenv.config();
const crypto = require('crypto');
const connectDB = require('./db');


// Server
const app = express();
app.use(express.json());

// Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use('/api', authRoutes);

app.get('/generate-key', (req, res) => {
  const secretKey = crypto.randomBytes(64).toString('hex');
  res.json({ secretKey });
});

// Connecting to MongoDB
connectDB(process.env.MONGODB_URI, process.env.PORT, app);
const user = {
  _id: 'user_id',
  username: 'username',
  userType: 'userType'
};

