// Importing JWT
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Extracting token from Authorization Header
  const token = req.headers.authorization?.split(' ')[1];

  // if token is not found
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // verifing token with secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // check if verification failed
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Store user information
    req.user = decoded;

    // Calling next route handler
    next();
  });
}

module.exports = {
  verifyToken
};
