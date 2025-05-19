import mongoose from "mongoose";
import { User } from "../@types/User";

const { Schema } = mongoose;

const UserSchema: mongoose.Schema<User> = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: /\S+@\S+\.\S+/,
      message: "Invalid email format",
    },
    password: { type: String, required: true },
    friendList: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const UserModel: mongoose.Model<User> = mongoose.model<User>("User", UserSchema, "User");
