import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  _id?: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  }
});

const userModel = mongoose.model<IUser>("Users", userSchema);

export default userModel;

/**
* @swagger
* components:
* schemas:
* User:
* type: object
* required:
* - email
* - password
* properties:
* email:
* type: string
* description: The user email
* password:
* type: string
* description: The user password
* example:
* email: 'bob@gmail.com'
* password: '123456'
*/
