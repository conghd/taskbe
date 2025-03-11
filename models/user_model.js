const mongoose = require("mongoose")
const { ObjectId } = require("mongodb");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your name'],
  },
  email: {
    type: String,
    required: [true, 'Please input your email'],
    index: true,
    unique: true,
  },

}, {timestamps: true});


const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;