import request from 'supertest';
import app from '../app';
import Post from '../models/Post';
import jwt from 'jsonwebtoken';

// Mock the Post model and JWT
jest.mock('../models/Post');
jest.mock('jsonwebtoken');

describe('Post Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Add Post', () => {
    it('should add a new post successfully with a valid token', async () => {
      // Mock JWT verification
      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
        callback(null, { _id: 'user123' }); // Mock user ID from token
      });

      // Mock Post creation
      (Post.create as jest.Mock).mockResolvedValue({
        _id: '64abc1234567890abcdef123',
        title: 'My First Post',
        content: 'This is the content of the first post.',
        userId: 'user123',
      });

      // Make request to create post
      const res = await request(app)
        .post('/posts')
        .set('Authorization', 'Bearer valid_token') // Pass token in the header
        .send({
          title: 'My First Post',
          content: 'This is the content of the first post.',
        });

      // Assertions
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', 'My First Post');
      expect(res.body).toHaveProperty('content', 'This is the content of the first post.');
      expect(res.body).toHaveProperty('userId', 'user123');
    });

    it('should return 401 if no token is provided', async () => {
      const res = await request(app).post('/posts').send({
        title: 'My First Post',
        content: 'This is the content of the first post.',
      });

      expect(res.statusCode).toBe(401);
      // console.log("asd")
      // console.log(res.body);
      // expect(res.body.message).toBe('Access Denied');
    });

    it('should return 400 for invalid input', async () => {
      // Mock JWT verification
      (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
        callback(null, { _id: 'user123' }); // Mock user ID from token
      });

      const res = await request(app)
        .post('/posts')
        .set('Authorization', 'Bearer valid_token')
        .send({
          title: '', // Invalid input
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain('Validation failed');
    });
  });

  describe('Get All Posts', () => {
    it('should return all posts', async () => {
      (Post.find as jest.Mock).mockResolvedValue([
        {
          _id: '64abc1234567890abcdef123',
          title: 'Post 1',
          content: 'Content 1',
          userId: 'user123',
        },
      ]);

      const res = await request(app).get('/posts');

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0]).toHaveProperty('title', 'Post 1');
    });
  });

  describe('Get Post by ID', () => {
    it('should return a post by ID', async () => {
      (Post.findById as jest.Mock).mockResolvedValue({
        _id: '64abc1234567890abcdef123',
        title: 'Post 1',
        content: 'Content 1',
        userId: 'user123',
      });

      const res = await request(app).get('/posts/64abc1234567890abcdef123');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', 'Post 1');
    });

    it('should return 404 if post not found', async () => {
      (Post.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/posts/64abc1234567890abcdef123');

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Post not found');
    });
  });
});
