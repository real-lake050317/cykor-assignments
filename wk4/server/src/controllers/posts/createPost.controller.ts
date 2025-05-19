import { Request, Response } from "express";

import { PostModel } from "../../models/Post.models";
import { Post } from "../../@types/Post";
import { CreatePostReqBody } from "./@types/CreatePostReqBody";

export const createPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, body, tags, isPrivate }: CreatePostReqBody = req.body;
    const userId: string = res.locals._id;

    if (!title || !body) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost: Post = await PostModel.create({
      title,
      body,
      userId,
      tags,
      isPrivate,
    });

    return res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
