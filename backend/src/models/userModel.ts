import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUserDTO {
  username: string;
  email: string;
  password: string;
  role?: string;
}
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role?: string;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
