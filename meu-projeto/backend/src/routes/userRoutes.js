import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obter perfil do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *       401:
 *         description: Não autorizado
 */
router.get('/profile', getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Atualizar perfil do usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Novo Nome"
 *     responses:
 *       200:
 *         description: Perfil atualizado
 *       400:
 *         description: Dados inválidos
 */
router.put('/profile', updateProfile);

export default router;