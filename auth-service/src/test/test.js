// test.js

const User = require('../models/User');

const showAllUsers = async () => {
  try {
    const users = await User.find();
    users.forEach(user => {
      console.log(`Username: ${user.username}, Password: ${user.password}`);
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};

// Call the function to show all users
showAllUsers();
