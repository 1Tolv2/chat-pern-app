import { Request, Response } from "express";
import { findAllPostsByUser } from "../models/Post";
import {
  createUser,
  findAllUsers,
  findUserById,
  UserAttributes,
} from "../models/User";

export const handleNewUser = async (
  req: Request<UserAttributes>,
  res: Response<UserAttributes>
): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    let user = (await findUserById(
      parseInt(req.params.id)
    )) as unknown as UserAttributes;
    user.posts = await findAllPostsByUser(parseInt(req.params.id));
    // user.servers = await findAllServersByUser(parseInt(req.params.id)) as unknown as ServerAttributes[];
    res.json(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

export const editUser = async (req: Request, res: Response) => {
  res.json({ user: { message: "User updated" } });
};

export const deleteUser = async (req: Request, res: Response) => {
  res.json({ message: "User deleted" });
};
