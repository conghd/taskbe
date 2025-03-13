const mongoose = require("mongoose")
const { ObjectId } = require("mongodb");

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please input task title'],
  },
  status: {
    type: String,
    enum: ["To do", "In Progress", "Done"],
    default: "To do"
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, {timestamps: true});


const TaskModel = mongoose.model("Task", TaskSchema)

module.exports = TaskModel;