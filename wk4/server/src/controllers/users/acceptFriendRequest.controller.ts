import { Request, Response } from 'express';

import { FriendRelModel } from '../../models/FriendRel.models';

import { FriendRel } from '../../@types/FriendRel';

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { _id: userId } = res.locals;
    const { requestId } = req.query;

    const request: FriendRel | null = await FriendRelModel.findById(requestId);

    if (request === null || request.status !== "pending") {
      return res.status(404).json({ message: "Pending request not found" });
    }

    if (request.friendId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    request.status = "accepted";
    request.isFriend = true;

    await request.save();

    await FriendRelModel.create({
      userId: request.friendId,
      friendId: request.userId,
      status: "accepted",
      isFriend: true,
    });

    return res.status(200).json({ success: true, request });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
