// Creating User Schema
const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    userType: {
        type: String,
        required: false,
        enum: ["STUDENT", "TEACHER", "ADMIN", "SUPER_ADMIN"],
    }
})

const User = Mongoose.model("user", UserSchema)
module.exports = User


// Create SuperADMIN
const createSuperAdmin = async () => {
    try {
      const existingUser = await User.findOne({ username: "superadmin" });
      if (!existingUser) {
        const superAdmin = new User({
          username: "superadmin",
          password: "superadmin",
          userType: "SUPER_ADMIN",
        });
        await superAdmin.save();
        console.log("Super admin user created successfully.");
      } else {
        console.log("Super admin user already exists.");
      }
    } catch (error) {
      console.error("Error creating super admin user:", error);
    }
  };
  
  createSuperAdmin();