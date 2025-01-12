import { Request, Response } from 'express';
import Post from '../models/Post';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const createPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, content } = req.body;

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const post = new Post({ title, content, userId: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await Post.find(); // Fetch all posts from the database
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };