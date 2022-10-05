import { Request, Response } from "express";
import { SlonikError } from "slonik";
import { ErrorMessage } from "../global/types";
import { findAllPostsByUser } from "../models/Post";
import {
  createUser,
  findAllUsers,
  findUserById,
  UserAttributes,
} from "../models/User";

export const handleNewUser = async ( req: Request<UserAttributes>, res: Response ): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const requiredFields = ["username", "email", "password"];
    res.status(400).json({
      error: "Missing required fields",
      missingFields: requiredFields.filter((key) => !(req.body.hasOwnProperty(key))
      )
    });
    return;
  } else {
    const user: UserAttributes | ErrorMessage = await createUser(req.body);

    user.hasOwnProperty("error") ? res.status(409).json({ error: (user as ErrorMessage).error })
    : res.status(201).json(user);
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
    console.log(err);
    res.sendStatus(400);
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
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

export const editUser = async (req: Request, res: Response): Promise<void> => {
  res.json({ user: { message: "User updated" } });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "User deleted" });
};
