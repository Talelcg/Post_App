import { Router } from 'express';
import {
  addComment,
  getAllComments,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from '../controllers/CommentController';
import { authMiddleware } from '../controllers/AuthController';

const router = Router();

router.post('/', authMiddleware, addComment); 
router.get('/', getAllComments); 
router.get('/post/:postId', getCommentsByPost); 
router.put('/:id', authMiddleware, updateComment); 
router.delete('/:id', authMiddleware, deleteComment); 
export default router;
