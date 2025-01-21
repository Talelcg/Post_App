import request from 'supertest';
import app from '../app'; // Import the app to test
import User from '../models/User';

jest.mock('../models/User'); // Mock the User model to isolate controller functionality

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Register', () => {
    it('should register a new user successfully', async () => {
      (User.create as jest.Mock).mockResolvedValue({
        _id: '64abc1234567890abcdef123',
        username: 'test_user',
        email: 'test@example.com',
        password: 'hashed_password',
      });

      const res = await request(app).post('/users/register').send({
        username: 'test_user',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.user).toHaveProperty('username', 'test_user');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return a validation error if required fields are missing', async () => {
      const res = await request(app).post('/users/register').send({
        email: 'test@example.com',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Username, email, and password are required.');
    });

    it('should return an error if the username already exists', async () => {
      (User.create as jest.Mock).mockRejectedValue({
        code: 11000,
        keyValue: { username: 'test_user' },
      });

      const res = await request(app).post('/users/register').send({
        username: 'test_user',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('username already exists.');
    });
  });

  describe('Login', () => {
    it('should log in a user successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: '64abc1234567890abcdef123',
        username: 'test_user',
        email: 'test@example.com',
        password: 'hashed_password',
        save: jest.fn(),
      });

      const res = await request(app).post('/users/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
    });

    it('should return an error for invalid credentials', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app).post('/users/login').send({
        email: 'test@example.com',
        password: 'wrong_password',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('wrong username or password');
    });
  });

  describe('Logout', () => {
    it('should log out a user successfully', async () => {
      const res = await request(app).post('/users/logout').send({
        refreshToken: 'some_valid_refresh_token',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('success');
    });

    it('should return an error for an invalid refresh token', async () => {
      const res = await request(app).post('/users/logout').send({
        refreshToken: 'invalid_refresh_token',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('fail');
    });
  });
});
