import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { UserModel } from "../../models/User.models";
import { User } from "../../@types/User";

export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const user: User | null = await UserModel.findOne({ email: email }).exec();

    if (user !== null) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
