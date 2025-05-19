import mongoose from "mongoose";
import { Post } from "../@types/Post";

const { Schema } = mongoose;

const PostSchema: mongoose.Schema<Post> = new Schema<Post>(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    userId: { type: String, required: true },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    isEdited: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PostModel: mongoose.Model<Post> = mongoose.model<Post>("Post", PostSchema, "Post");
