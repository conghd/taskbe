const express = require('express')
const router = express.Router()

const {
  loginUser,

} = require('../controllers/user_controller')

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

module.exports = router