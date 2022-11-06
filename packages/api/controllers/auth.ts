import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserItem } from "@chat-app-typescript/shared";
import responseMessages from "../global/responseMessages";
import User from "../models/User";
import { requiredFieldsCheck } from ".";
dotenv.config();

const { oops, invalidToken, missingReqFields, unauthorized } =
  responseMessages.errorResponse;

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.user
    ? next()
    : res.status(unauthorized.status).json({ error: unauthorized.message });
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
  if (jwt) {
    try {
      req.user = verifyToken(jwt);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "invalid token") {
          res.status(invalidToken.status);
          res.json({ error: invalidToken.message });
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
        res.status(oops.status);
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
      res.json({ id: user.id?.toString(), username });
    }
  } else {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
      missingFields,
    });
  }
};
