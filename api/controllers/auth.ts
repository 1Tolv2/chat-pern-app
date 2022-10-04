import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

export const logInUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  //     const modifiedUsername = username.toLowerCase();
  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Incorrect data, username and password is required" })
      .end();
  } else {
    const user = await User.authorizeUser(username, password);
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
      res.status(401).json({
        error: "Validation failed, username or password is incorrect",
      });
    }
  }
};
