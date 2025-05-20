import { Request, Response } from "express";

import { UserModel } from "../../models/User.models";
import { User } from "../../@types/User";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user: User | null = await UserModel.findById(userId).exec();

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
