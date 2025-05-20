import { Request, Response } from "express";

import { PostModel } from "../../models/Post.models";

import { Post } from "../../@types/Post";

export const deletePost = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const postId: string = req.params.id;
    const userId: string = res.locals._id;

    const post: Post | null = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await PostModel.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
