import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import User from '../models/User';

describe('User Endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it(' register a new user', async () => {
    const res = await request(app).post('/users/register').send({
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'user1password',
    });
    expect(res.statusCode).toEqual(200);
  });

  it(' login the user', async () => {
    await request(app).post('/users/register').send({
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'user1password',
    });

    const res = await request(app).post('/users/login').send({
      email: 'user1@gmail.com',
      password: 'user1password',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
  });
});
