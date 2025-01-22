import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Post from '../models/Post';
import User from '../models/User';

let token: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  await request(app).post('/users/register').send({
    username: 'trypost',
    email: 'trypost@gmail.com',
    password: 'trypostpassword',
  });

  const res = await request(app).post('/users/login').send({
    email: 'trypost@gmail.com',
    password: 'trypostpassword',
  });

  token = res.body.accessToken;
});

afterEach(async () => {
  await Post.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My First Post',
        content: 'Content of the first post',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toEqual('My First Post');
  });

  it('should fetch all posts', async () => {
    await Post.create({
      title: 'My First Post',
      content: 'Content of the first post',
      userId: new mongoose.Types.ObjectId(),
    });

    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
