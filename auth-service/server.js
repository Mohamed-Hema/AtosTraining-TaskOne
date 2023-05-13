// Global Requirements
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/routes');
dotenv.config();
const crypto = require('crypto');
const User = require('./src/models/User');

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


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

