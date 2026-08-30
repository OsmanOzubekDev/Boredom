import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluşturur
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
 *         description: Kullanıcı başarıyla oluşturuldu
 */
router.post('/register', register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve JWT token döner
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
 *         description: Başarılı giriş ve JWT token
 */
router.post('/login', login);

export default router;