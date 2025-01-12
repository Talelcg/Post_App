import { Request, Response } from 'express';
import CommentModel from '../models/Comment'; // Rename to avoid collision
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

// Add a Comment
export const addComment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { content, postId } = req.body;
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const newComment = await CommentModel.create({
      content,
      postId,
      userId: req.user.id,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get All Comments
export const getAllComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await CommentModel.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get Comments by Post
export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await CommentModel.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update Comment
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete Comment
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
