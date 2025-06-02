import { Request, Response } from "express";

import { FriendRelModel } from "../../models/FriendRel.models";

import { FriendRel } from "../../@types/FriendRel";
import { UserModel } from "../../models/User.models";

export const getFriendsList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const friends: FriendRel[] = await FriendRelModel.find({
      userId,
      status: "accepted",
      isFriend: true,
    });

    const friendDetails = await Promise.all(
      friends.map(async (friend) => {
        const friendUser = await UserModel.findById(friend.friendId);
        return {
          _id: friendUser?._id,
          name: friendUser?.name,
          email: friendUser?.email,
          status: friend.status,
          isFriend: friend.isFriend,
        };
      })
    );

    return res.status(200).json({ success: true, friendDetails });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
