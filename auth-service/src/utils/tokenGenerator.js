const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const token = jwt.sign(
    { userId: user._id, username: user.username, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = generateToken;
