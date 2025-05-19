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
    const userId: string = res.locals._id;

    const user = await UserModel.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendIds: string[] = user.friendList.map((friend) =>
      friend.toString()
    );

    const posts: Post[] = await PostModel.find({
      $or: [{ isPrivate: false }, { userId: { $in: friendIds } }],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .exec();

    const postsWithName = await Promise.all(
      posts.map(async (post) => {
        const postUser = await UserModel.findById(post.userId).exec();
        return {
          ...post.toObject(),
          userName: postUser ? postUser.name : "Unknown User",
        };
      })
    );

    return res
      .status(200)
      .json({ message: "Posts fetched", posts: postsWithName });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
