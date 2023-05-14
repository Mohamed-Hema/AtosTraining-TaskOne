const express = require('express');
const app = express();
const axios = require('axios');
const authService = axios.create({
  baseURL: 'http://localhost:3000', // Replace with the URL of the auth-service
});

// Import your route.js file
const questionsRouter = require('../routes/routes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', questionsRouter);

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
