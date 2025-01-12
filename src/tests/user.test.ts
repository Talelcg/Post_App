import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';

describe('User Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterEach(async () => {
    // Clean up the users collection after each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/users/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User registered successfully');
  });

  it('should login the user', async () => {
    await request(app).post('/users/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    const res = await request(app).post('/users/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });
});
