import { Request, Response } from "express";

import { PostModel } from "../../models/Post.models";
import { UserModel } from "../../models/User.models";
import { Post } from "../../@types/Post";

export const getPosts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { page, limit } = req.query;
    const pageNumber: number = parseInt(page as string) || 1;
    const limitNumber: number = parseInt(limit as string) || 10;
    const skip: number = (pageNumber - 1) * limitNumber;

    const posts: Post[] = await PostModel.find()
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    // Get user name and for each post

    const postsWithUserName = await Promise.all(
        posts.map(async (post) => {
            const user = await UserModel.findById(post.userId);
            return {
                ...post.toObject(),
                userName: user ? user.name : "Unknown User",
            };
        })
    );

    return res.status(200).json({ message: "Posts fetched", postsWithUserName });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
