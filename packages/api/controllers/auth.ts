import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { requiredFieldsCheck } from ".";
import { UserItem } from "@chat-app-typescript/shared";
dotenv.config();

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

export const handleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const jwt = req.cookies.jwt;
  console.log("COOKIE RECIEVED?", jwt);
  if (jwt) {
    try {
      req.user = verifyToken(jwt);
    } catch (err) {
      if (err instanceof Error) {
        err.message === "invalid token" &&
          res.status(401).json({ error: "Invalid token" });
      } else console.error(err);
    }
  }
  next();
};

export const logInUser = async (req: Request, res: Response): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, ["username", "password"]);

  if (missingFields.length === 0) {
    const username = req.body.username.toLowerCase();
    let user: UserItem | null = null;

    try {
      user = await User.authorizeUser(username, req.body.password);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    }

    if (user) {
      const token = jwt.sign(
        { user_id: user.id?.toString(), username: username },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
          subject: user.id?.toString(),
        }
      );
      res
        .cookie("jwt", token, { maxAge: 7200000, httpOnly: true })
        .json({ user: { id: user.id?.toString(), username: username } });
    }
  } else {
    res.status(400).json({
      error: "Missing required fields",
      missingFields,
    });
  }
};
