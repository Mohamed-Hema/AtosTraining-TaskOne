// Global Requirements
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// SignUp Function
const signUp = async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // Check if user is SuperAdmin
    if (req.user.userType === 'SUPER_ADMIN') {
      // Check if the userType is ADMIN
      if (userType === 'ADMIN') {
        // Create a new Admin user
        const user = new User({ username, password, userType });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, username: user.username, userType: user.userType },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );

        // Return Results
        return res.status(201).json({ message: 'User was successfully created', userType: user.userType, token });
      } else {
        return res.status(400).json({ message: 'Only SUPER_ADMIN can create an ADMIN user' });
      }
    } else {
      return res.status(401).json({ message: 'Access denied. Only SUPER_ADMIN can create users' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Login Function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is the superadmin
    if (user.userType === 'SUPER_ADMIN') {
      if (password === user.password) {
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
    const token = jwt.sign(
      { userId: user._id, username: user.username, userType: user.userType },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', userType: user.userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signUp, login };


