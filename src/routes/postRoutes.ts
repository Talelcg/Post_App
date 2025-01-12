import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/PostController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createPost); // Route to create a post (requires authentication)
router.get('/', getAllPosts); // Route to fetch all posts (public)

export default router;
