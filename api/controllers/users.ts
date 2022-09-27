import { Request, Response } from "express";
import { createUser, UserDBAttributes, findAllUsers,findUserById } from "../models/User";

export const handleNewUser = async (
  req: Request<UserDBAttributes>,
  res: Response<UserDBAttributes>
): Promise<void> => {
  try {
    const user: UserDBAttributes = await createUser(req.body);
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
    const user = await findUserById(parseInt(req.params.id));
    // console.log(user)
    res.json(user);
  } catch(err) {
    res.sendStatus(400);
  }
  // res.json({ user: [{ message: "User with posts and servers" }] });
}; // get /:id with posts

export const editUser = async (req: Request, res: Response) => {
  res.json({ user: { message: "User updated" } });
};

export const deleteUser = async (req: Request, res: Response) => {
  res.json({ message: "User deleted" });
};
