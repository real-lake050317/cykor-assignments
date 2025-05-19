import { Request, Response } from "express";

export const checkLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { _id } = res.locals as { _id: string };

  return res.status(200).json({ message: "User is logged in", _id });
};
