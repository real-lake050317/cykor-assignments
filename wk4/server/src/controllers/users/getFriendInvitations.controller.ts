import { Request, Response } from "express";

import { FriendRelModel } from "../../models/FriendRel.models";
import { UserModel } from "../../models/User.models";

import { FriendRel } from "../../@types/FriendRel";

export const getFriendInvitations = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals;

    const requests: FriendRel[] = await FriendRelModel.find({
      friendId: userId,
      status: "pending",
    });

    // use Promise.all to fetch user details for each invitation

    const friendRequestsWithDetails = await Promise.all(
      requests.map(async (request) => {
        const user = await UserModel.findById(request.userId).select(
          "name email"
        );
        return {
          ...request.toObject(),
          userDetails: {
            userId: user?._id || "",
            name: user?.name || "Unknown User",
            email: user?.email || "",
          },
        };
      })
    );

    return res.status(200).json({ success: true, invitations: friendRequestsWithDetails });
    
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
