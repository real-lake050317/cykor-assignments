import { Request, Response } from "express";

import { PostModel } from "../../models/Post.models";

export const updatePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { _id: userId } = res.locals;
  const { title, body } = req.body;

  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    post.title = title;
    post.body = body;
    post.updatedAt = new Date();
    
    await post.save();

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
