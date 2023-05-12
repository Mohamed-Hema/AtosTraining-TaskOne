const express = require('express')
const router = express.Router()
const { register, login } = require("./Auth")
// Import Register Funciton
router.route("/register").post(register)
// Import Login Funciton
router.route("/login").post(login)
module.exports = router;