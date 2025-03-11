const express = require('express')
const router = express.Router()

const {
  createTask,
  getTasks,
  updateTask,
} = require('../controllers/task_controller');

const { protect } = require('../middlewares/auth_middleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The task details
 *         status:
 *           type: string
 *           enum: [Pending, In Progress, Completed]
 *           description: The current status of the task
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the task
 *         assignedTo:
 *           type: string
 *           description: The ID of the assigned user (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the task was created
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/tasks:
 *   get:
 *     summary: Get all tasks (requires authentication)
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of tasks to retrieve per page
 *     responses:
 *       200:
 *         description: A list of tasks with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of tasks per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                 totalTasks:
 *                   type: integer
 *                   description: Total number of tasks in the database
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdBy:
 *                         type: string
 *                       assignedTo:
 *                         type: string
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Server error
 */
router.route('').get(protect, getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               assignedTo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */
router.route('').post(createTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *               assignedTo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.route('/:taskId').put(protect, updateTask);


module.exports = router