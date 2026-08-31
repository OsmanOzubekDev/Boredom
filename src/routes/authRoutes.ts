import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Create a new user account
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: osman
 *               email:
 *                 type: string
 *                 example: osman@example.com
 *               password:
 *                 type: string
 *                 example: osman123
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/register', register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User logs in and receives a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: osman
 *               email:
 *                 type: string
 *                 example: osman@example.com
 *               password:
 *                 type: string
 *                 example: osman123
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned
 */
router.post('/login', login);

export default router;