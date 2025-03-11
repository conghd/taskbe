const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const logger = require("../utils/logger")
const UserModel = require('../models/user_model')
const { generateAccessToken } = require('../utils/token_generator')


const loginUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

  try {
    // Check if user already exists
    let user = await UserModel.findOne({ email });
    if (!user) {
      // Register the user if not found
      user = new UserModel({
        name,
        email,
      });
      await user.save();
    }

    // Generate JWT token
    const token = generateAccessToken(user._id);

    // Return the access token
    res.json({ token });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = { loginUser }