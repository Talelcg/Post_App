import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};
