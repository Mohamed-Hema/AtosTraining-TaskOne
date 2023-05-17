const express = require('express');
const app = express();
const axios = require('axios');
const questionsRouter = require('../routes/routes');
require('dotenv').config();

app.use(express.json());

app.use('/api', questionsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
