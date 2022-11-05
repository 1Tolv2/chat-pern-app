import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserItem } from "@chat-app-typescript/shared";
import User from "../models/User";
import { requiredFieldsCheck } from ".";
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
        if (err.message === "invalid token") {
          res.status(401);
          res.json({ error: "Invalid token" });
        }
      }
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
        res.status(500);
        res.json({ error: err.message });
      }
    }

    if (user) {
      const token = jwt.sign(
        { user_id: user.id?.toString(), username },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
          subject: user.id?.toString(),
        }
      );

      res.cookie("jwt", token, { maxAge: 7200000, httpOnly: true });
      res.json({ user: { id: user.id?.toString(), username } });
    }
  } else {
    res.status(400);
    res.json({
      error: "Missing required fields",
      missingFields,
    });
  }
};
