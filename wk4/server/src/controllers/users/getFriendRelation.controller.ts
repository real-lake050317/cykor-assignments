import { Request, Response } from "express";

import { UserModel } from "../../models/User.models";
import { FriendRelModel } from "../../models/FriendRel.models";
import { FriendRel } from "../../@types/FriendRel";

export const getFriendRelation = async (req: Request, res: Response) => {
  const { _id: userId } = res.locals;
  const { friendId } = req.query;

  try {
    const user = await UserModel.findById(friendId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const friendRelation: FriendRel | null = await FriendRelModel.findOne({
      $or: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    });

    if (!friendRelation) {
      return res
        .status(200)
        .json({ success: true, relation: null, message: "No relation found" });
    }

    if (friendRelation.isBlocked) {
      return res.status(200).json({
        success: true,
        relation: "blocked",
        message: "User is blocked",
      });
    } else if (friendRelation.isFriend) {
      return res.status(200).json({
        success: true,
        relation: "friends",
        message: "User is a friend",
      });
    } else if (friendRelation.status === "pending") {
      return res.status(200).json({
        success: true,
        relation: "pending",
        message: "Friend request is pending",
      });
    } else if (friendRelation.status === "rejected") {
      return res.status(200).json({
        success: true,
        relation: "rejected",
        message: "Friend request was rejected",
      });
    } else {
      return res.status(200).json({
        success: true,
        relation: null,
        message: "User is not a friend",
      });
    }
  } catch (error) {
    console.error("Error fetching friend relation:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
