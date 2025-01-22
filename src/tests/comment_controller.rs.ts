import request from "supertest";
import mongoose from "mongoose";
import commentModel from "../models/Comment";
import postModel from "../models/Post";
import userModel, { IUser } from "../models/User";
import app from "../app";


let accessToken: string;
let refreshToken: string;
let postId: string;
let commentId: string;

beforeAll(async () => {
  await commentModel.deleteMany(); 
  await postModel.deleteMany(); 
  await userModel.deleteMany(); 

  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI!, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("MongoDB connected!");
});

afterAll(async () => {
  console.log("Disconnecting MongoDB...");
  await mongoose.connection.close();
  console.log("MongoDB disconnected.");
});

beforeEach(async () => {
  console.log("Setting up test environment...");

  await request(app).post('/users/register').send({
    username: 'test_user',
    email: 'test_user@gmail.com',
    password: 'password123',
  });

  const loginRes = await request(app).post('/users/login').send({
    email: 'test_user@gmail.com',
    password: 'password123',
  });

  accessToken = loginRes.body.accessToken;
  refreshToken = loginRes.body.refreshToken;

  // Create a test post
  const postRes = await request(app)
    .post('/posts')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title: "Test Post",
      content: "Test Content",
    });

  postId = postRes.body._id;
});

describe("Comments Tests", () => {
  test("Test Create Comment", async () => {
    const response = await request(app)
      .post(`/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: "Test Comment",
        postId: postId,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe("Test Comment");
    commentId = response.body._id;
  });

//   test("Test Get Comments by Post ID", async () => {
//     const response = await request(app).get(`/comments/post/${postId}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(1);
//     expect(response.body[0].content).toBe("Test Comment");
//   });

  test("Test Update Comment", async () => {
    const response = await request(app)
      .put(`/comments/${commentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: "Updated Comment",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated Comment");
  });

//   test("Test Delete Comment", async () => {
//     const response = await request(app)
//       .delete(`/comments/${commentId}`)
//       .set('Authorization', `Bearer ${accessToken}`);
//     expect(response.statusCode).toBe(200);

//     const getResponse = await request(app).get(`/comments/post/${postId}`);
//     expect(getResponse.body.length).toBe(0);
//   });
});
