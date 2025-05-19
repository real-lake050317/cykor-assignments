import { Document } from "mongoose";

export interface Post extends Document {
  title: string;
  body: string;
  userId: string;
  likes: string[];
  comments: string[];
  tags: string[];
  isEdited: boolean;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}
