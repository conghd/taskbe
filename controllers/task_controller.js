const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const logger = require("../utils/logger")
const TaskModel = require('../models/task_model')

const createTask = asyncHandler(async (req, res) => {
  logger.info("TaskController::createTask")
  try {
    const { title, description, createdBy, assignedTo } = req.body;
    const task = new TaskModel({ title, description, createdBy, assignedTo });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error creating task" });
  }
});

const getTasks = asyncHandler(async (req, res) => {
  logger.info("TaskController::getTasks")
  try {
    let { page = 1, limit = 10, status } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = status ? { status } : {}; // Filter by status if provided
    logger.info(JSON.stringify(query));

    const tasks = await TaskModel.find(query)
      .populate("createdBy assignedTo", "name email")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalTasks = await TaskModel.countDocuments(query);

    res.json({
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});


const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


const updateTask = asyncHandler(async (req, res) => {
  logger.info("TaskController::getTasks");
  try {
    const updates = req.body; // Allows partial updates
    const task = await TaskModel.findByIdAndUpdate(req.params.taskId, updates, { new: true })
      .populate("assignedTo", "name email");

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Error updating task" });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID
    const task = await TaskModel.findById(id);
    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task
    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server error" });
  }
});


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
}