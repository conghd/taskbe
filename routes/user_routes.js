const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth_middleware')

const {
  loginUser,
  getUsers,
} = require('../controllers/user_controller')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user, used for login and registration
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Access token to authenticate the user
 */


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login or register a user using name and email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in or registered, returns an access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.route('/login').post(loginUser);


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of all users with pagination (requires authentication)
 *     tags: [Users]
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
 *         description: The number of users to retrieve per page
 *     responses:
 *       200:
 *         description: A list of users with pagination
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
 *                   description: Number of users per page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                 totalUsers:
 *                   type: integer
 *                   description: Total number of users in the database
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *     500:
 *       description: Server error
 */
router.route("/").get(protect, getUsers);

module.exports = router