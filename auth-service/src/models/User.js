// Adding Mongoose
const mongoose = require('mongoose');

//Creating User Specs/Schema
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


// Create superadmin user
const createSuperAdmin = async () => {
  try {
    const existingUser = await User.findOne({ username: 'superadmin' });
    if (!existingUser) {
      const superadmin = new User({ username: 'superadmin', password: 'superadmin', userType: 'SUPER_ADMIN' });
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


module.exports = User;
