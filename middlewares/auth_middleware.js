const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user_model')
const { decodeToken } = require('../utils/token_generator')

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({error: "Access denied. No token provided"});
  }
  
  const userId = decodeToken(token);
  if (!userId) {
    return res.status(403).json({error: "Invalid or expired token"});
  }
  
  // Get user from the token
  const user = await UserModel.findOne({ _id: userId});

  if (!user) {
    return res.status(401).json({ code: 1, message: "Unauthorized user", })
  }
  req.user = user;

  next()
})

module.exports = { protect }