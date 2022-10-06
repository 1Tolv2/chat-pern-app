import { Request, Response, NextFunction } from "express";
import { UserItem } from "@chat-app-typescript/shared";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { requiredFieldsCheck } from ".";
dotenv.config();

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

export const logInUser = async (req: Request, res: Response) => {
  const missingFields = requiredFieldsCheck(req.body, ["username", "password"])
  if (missingFields.length === 0) {
    const username = req.body.username.toLowerCase()
    const user = await User.authorizeUser({username, password: req.body.password});
    if (user) {
      const token = jwt.sign(
        { userId: user.id?.toString(), username: username },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
          subject: user.id?.toString(),
        }
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({ message: "Login successful" });
    } else {
      res.status(400).json({
        error: "Missing required fields",
        missingFields,
      });
    }
  }
};
