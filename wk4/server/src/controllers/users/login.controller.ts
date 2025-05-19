import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { UserModel } from "../../models/User.models";
import { User } from "../../@types/User";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user: User | null = await UserModel.findOne({ email: email }).exec();

    if (user === null) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (isPasswordValid === false) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token: string = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET as string,
      {
        expiresIn: "100d",
      }
    );

    return res
      .status(200)
      .json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
