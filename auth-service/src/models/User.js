const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['STUDENT', 'TEACHER', 'ADMIN', 'SUPER_ADMIN'],
    required: true
  }
});
const User = mongoose.model('User', userSchema);
const comparePassword = userSchema.methods.comparePassword = async function(password) {
  try {
    if (!password) {
      throw new Error('Password is required');
    }
    return await bcrypt.compare(password, this.password || '');
  } catch (error) {
    throw new Error(error);
  }
};




const createSuperAdmin = async () => {
  try {
    const existingUser = await User.findOne({ username: 'superadmin' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('superadmin', 10); // Hash the password with bcrypt
      const superadmin = new User({ username: 'superadmin', password: hashedPassword, userType: 'SUPER_ADMIN' });
      await superadmin.save();
      console.log('Superadmin user created successfully');
    } else {
      console.log('Superadmin user already exists');
    }
  } catch (error) {
    console.error('Error creating superadmin user:', error);
  }
};

createSuperAdmin();

// Validate Password
const validatePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {validatePassword, User, comparePassword};

