import { Router } from 'express';
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/PostController';
import { authMiddleware } from '../controllers/AuthController';

const router = Router();
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

router.post('/', authMiddleware, addPost);
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */ 
router.get('/', getAllPosts);
router.get('/:id', getPostById); 
router.put('/:id', authMiddleware, updatePost); 
router.delete('/:id', authMiddleware, deletePost); 

export default router;
