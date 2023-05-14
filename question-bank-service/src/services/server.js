const express = require('express');
const app = express();

// Import your route.js file
const questionsRouter = require('../routes/routes');

// Middleware
app.use(express.json());

// Routes
app.use('/questions', questionsRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
