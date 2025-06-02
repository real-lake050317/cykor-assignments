import { Request, Response } from "express";

import { PostModel } from "../../models/Post.models";
import { FriendRelModel } from "../../models/FriendRel.models";

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

    const requesterId = res.locals._id;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "User ID is required" });
    }

    const isOwnProfile = requesterId === id;

    let isFriend = false;

    if (!isOwnProfile) {
      const relation = await FriendRelModel.exists({
        $or: [
          { userId: requesterId, friendId: id, status: "accepted" },
          { userId: id, friendId: requesterId, status: "accepted" },
        ],
      });
      isFriend = relation !== null;
    }

    const visibilityFilter =
      (isOwnProfile || isFriend) ? {} : { isPrivate: false };

    const posts: Post[] = await PostModel.find({
      userId: id,
      ...visibilityFilter,
    })
      // .skip(skip)
      // .limit(limitNumber);
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Posts fetched", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
