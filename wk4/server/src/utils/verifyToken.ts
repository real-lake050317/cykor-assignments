import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token: string | undefined = req.headers["authorization"]?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(400)
        .json({ message: "no token found", success: false });
    }

    verify(token, process.env.SECRET as string, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid Token", success: false });
      }

      const { _id } = decoded as { _id: string };

      res.locals._id = _id;

      next();
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
