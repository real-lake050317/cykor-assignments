import { Request, Response } from "express";

import { PostModel } from "../../models/Post.models";
import { Post } from "../../@types/Post";

export const getPostsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id, page, limit } = req.query;
    const pageNumber: number = parseInt(page as string) || 1;
    const limitNumber: number = parseInt(limit as string) || 10;
    const skip: number = (pageNumber - 1) * limitNumber;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const posts: Post[] = await PostModel.find({ userId: id })
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Posts fetched", posts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
