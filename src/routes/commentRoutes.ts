import { Router } from 'express';
import {
  addComment,
  getAllComments,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from '../controllers/CommentController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Define routes for comments
router.post('/', authenticateToken, addComment); // Add a comment
router.get('/', getAllComments); // Get all comments
router.get('/post/:postId', getCommentsByPost); // Get comments for a specific post
router.put('/:id', authenticateToken, updateComment); // Update a comment
router.delete('/:id', authenticateToken, deleteComment); // Delete a comment

export default router;
