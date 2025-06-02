import { Request, Response } from "express";

import { FriendRelModel } from "../../models/FriendRel.models";

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals;
    const { friendId } = req.query;

    if (!friendId || typeof friendId !== "string") {
      return res.status(400).json({ message: "Invalid friend ID" });
    }

    await FriendRelModel.deleteMany({
      $or: [
        { userId, friendId, status: "accepted" },
        { userId: friendId, friendId: userId, status: "accepted" },
      ],
    });

    return res.status(200).json({ success: true, message: "Friend removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
