import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/AuthRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';



dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the .env file');
}

const app = express();

app.use(express.json());


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
