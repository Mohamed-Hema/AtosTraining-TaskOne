// Global Requirements
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../models/User");

// Function to verify token
const verifyToken = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const user = User.findOne({ _id: decoded.id });
    res.send(user);
  });
};

// SignUp Function
const signUp = async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // Check if the userType is valid
    if (userType !== 'STUDENT' && userType !== 'TEACHER' && userType !== 'ADMIN') {
      return res.status(400).json({ message: 'Invalid userType' });
    }

    // Check if the user is SUPER_ADMIN
    if (req.userType === 'SUPER_ADMIN') {
      // Check if the inserted userType is ADMIN
      if (userType === 'admin') {
        // Create a new ADMIN user
        const user = new User({ username, password, userType });
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        // Return Results
        return res.status(201).json({ message: 'User was successfully created', userType: user.userType, token });
      } else {
        return res.status(400).json({ message: 'Only SUPER_ADMIN can create an ADMIN user' });
      }
    }

    // Create a new student or teacher user
    const user = new User({ username, password, userType });
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    // Return Results
    return res.status(201).json({ message: 'User was successfully created', userType: user.userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Login Function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate the request body
    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is the superadmin
    if (user.userType === 'SUPER_ADMIN') {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, username: user.username, userType: user.userType },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );
        return res.json({ message: 'Login successful', userType: user.userType, token });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    }

    // Handling Normal Users
    // Check Password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ message: 'Login successful', userType: user.userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username, userType: user.userType },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = { signUp, login };
