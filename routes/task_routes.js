const express = require('express')
const router = express.Router()

const {
  createTask,
  getTasks,
  updateTask,
  getTaskById,
  deleteTask,
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
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/tasks:
 *   post:
 *     summary: Create a new task (requires authentication)
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               createdBy:
 *                 type: string
 *                 description: The user ID of the person created the task
 *               assignedTo:
 *                 type: string
 *                 description: The user ID of the person the task is assigned to
 *     responses:
 *       200:
 *         description: Successfully created a task
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Server error
 */
router.route('').post(createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by ID (authentication required)
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.route("/:id").get(protect, getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update an existing task (requires authentication)
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *                 example: "Complete the report"
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 *                 example: "Finish the quarterly report for Q1"
 *               status:
 *                 type: string
 *                 description: The current status of the task (e.g., 'Incomplete', 'Complete')
 *                 example: "Incomplete"
 *               assignedTo:
 *                 type: string
 *                 description: The user ID of the person the task is assigned to
 *                 example: "userId123"
 *     responses:
 *       200:
 *         description: Successfully updated a task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The task's ID
 *                 title:
 *                   type: string
 *                   description: The title of the task
 *                 description:
 *                   type: string
 *                   description: The description of the task
 *                 status:
 *                   type: string
 *                   description: The current status of the task
 *                 createdBy:
 *                   type: string
 *                   description: The user ID of the person who created the task
 *                 assignedTo:
 *                   type: string
 *                   description: The user ID of the person assigned to the task
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Task not found with the provided ID
 *       500:
 *         description: Server error
 */
router.route('/:taskId').put(protect, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID (authentication required)
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.delete("/:id", protect, deleteTask);

module.exports = router