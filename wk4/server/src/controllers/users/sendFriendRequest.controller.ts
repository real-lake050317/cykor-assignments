import { Request, Response } from "express";

import { FriendRelModel } from "../../models/FriendRel.models";
import { UserModel } from "../../models/User.models";

import { FriendRel } from "../../@types/FriendRel";
import { User } from "../../@types/User";

export const sendFriendRequest = async (req: Request, res: Response) => {
  const { _id: userId } = res.locals;
  const { friendId } = req.query;

  if (!userId || !friendId) {
    return res
      .status(400)
      .json({ error: "User ID and Friend ID are required." });
  }

  try {
    const friendExists: User | null = await UserModel.findOne({
      _id: friendId,
    });

    if (friendExists === null) {
      return res.status(404).json({ error: "Friend not found." });
    }

    const existingRequest: FriendRel | null = await FriendRelModel.findOne({
      userId: userId,
      friendId,
    });

    if (existingRequest !== null) {
      return res.status(400).json({ error: "Friend request already sent." });
    }

    const isAlreadyFriends: FriendRel[] = await FriendRelModel.find({
      $or: [
        { userId, friendId, status: "accepted" },
        { userId: friendId, friendId: userId, status: "accepted" },
      ],
    });

    if (isAlreadyFriends.length > 0) {
      return res.status(400).json({ error: "You are already friends." });
    }

    const isBlocked: FriendRel | null = await FriendRelModel.findOne({
      $or: [
        { userId, friendId, isBlocked: true },
        { userId: friendId, friendId: userId, isBlocked: true },
      ],
    });

    if (isBlocked !== null) {
      return res
        .status(400)
        .json({ error: "You cannot send a request to a blocked user." });
    }

    const newFriendRequest: FriendRel = new FriendRelModel({
      userId: userId,
      friendId,
      status: "pending",
    });

    await newFriendRequest.save();

    return res
      .status(200)
      .json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while sending the friend request." });
  }
};
