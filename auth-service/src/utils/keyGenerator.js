const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.get('/generate-key', (req, res) => {
  const secretKey = crypto.randomBytes(64).toString('hex');
  res.json({ secretKey });
});

// app.listen(port, () => {
//   console.log(`Key Generator API running on port ${port}`);
// });

