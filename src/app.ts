import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";


dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the .env file');
}

const app = express();

app.use(express.json());
if (process.env.NODE_ENV == "development") {
  const options = {
  definition: {
  openapi: "3.0.0",
  info: {
  title: "Web Dev 2022 REST API",
  version: "1.0.0",
  description: "REST server including authentication using JWT",
  },
  servers: [{url: "http://localhost:3000",},],
  },
  apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Do not start the server here
export default app;
