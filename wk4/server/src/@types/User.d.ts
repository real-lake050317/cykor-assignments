import { Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  friendList: string[];
  createdAt: Date;
  updatedAt: Date;
}
