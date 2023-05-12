// Auth.js
const User = require("../model/User");

exports.register = async (req, res, next) => {
  const { username, password, userType } = req.body;

  if (!username || !password || password.length < 6) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const user = await User.create({
      username,
      password,
      userType,
    });

    return res.status(200).json({
      message: "User successfully created",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred during user creation",
      error: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({
        message: "Login is not successful",
        error: "User not found",
      });
    } else {
      return res.status(200).json({
        message: "Login is successful",
        user,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;

  if (role && id) {
    if (role === "admin") {
      try {
        const user = await User.findByIdAndUpdate(id, { userType: "ADMIN" }, { new: true });

        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        } else {
          return res.status(200).json({
            message: "User updated successfully",
            user,
          });
        }
      } catch (error) {
        return res.status(500).json({
          message: "An error occurred during user update",
          error: error.message,
        });
      }
    } else {
      return res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    return res.status(400).json({
      message: "Role or Id not present",
    });
  }
};
