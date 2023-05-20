const express = require('express');
const app = express();
const axios = require('axios');
const questionsRouter = require('../routes/routes');
require('dotenv').config();
const connectDB = require('./db');

app.use(express.json());

app.use('/api/questions', questionsRouter);

// Connecting to MongoDB
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
