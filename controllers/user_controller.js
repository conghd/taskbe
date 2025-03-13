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
    } else {
        user.name = name;
    }

    await user.save();

    // Generate JWT token
    const token = generateAccessToken(user._id);

    // Return the access token
    res.json({ token, user: {_id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


const getUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

  try {
    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await UserModel.find()
      .skip(skip)
      .limit(limit)
      .select("name email"); // Only return name and email

    // Count the total number of users
    const totalUsers = await UserModel.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      page,
      limit,
      totalPages,
      totalUsers,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = {
    loginUser,
    getUsers,
}