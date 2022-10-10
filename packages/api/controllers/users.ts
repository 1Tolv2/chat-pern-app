import { Request, Response } from "express";
import { UserItem } from "@chat-app-typescript/shared";
import { findAllPostsByUser } from "../models/Post";
import { createUser, findAllUsers, findUserById } from "../models/User";
import { requiredFieldsCheck } from ".";
import { findServersByUser } from "../models/Server";

export const handleNewUser = async (
  req: Request<UserItem>,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, [
    "username",
    "email",
    "password",
  ]);
  if (missingFields.length === 0) {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        res.status(409).json({ error: err.message });
      }
    }
  } else {
    res.status(400).json({
      error: "Missing required fields",
      missingFields,
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  console.log(req.user);
  try {
    let user = (await findUserById(
      parseInt(req.user?.userId)
    )) as unknown as UserItem;
    user.posts = await findAllPostsByUser(parseInt(req.user?.userId));
    user.servers = await findServersByUser(parseInt(req.user?.userId));
    res.json(user);
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
  res.json({ user: { message: "User updated" } });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "User deleted" });
};
