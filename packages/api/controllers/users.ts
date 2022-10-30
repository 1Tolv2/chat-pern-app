import { Request, Response } from "express";
import { UserItem } from "@chat-app-typescript/shared";
import { createUser, findAllUsers, findUserById } from "../models/User";
import { requiredFieldsCheck } from ".";
import { findServersByUser, findServerUsers } from "../models/Server";
import { UniqueIntegrityConstraintViolationError } from "slonik";

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
      await createUser(req.body);
      res.sendStatus(201);
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        res.status(409).json({ error: "Username or email already exists" });
      } else if (err instanceof Error) {
        res.status(400).json({ error: err.message });
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
    type serverUsersOutput = {
      id: number;
      user_id: number;
      server_id: number;
      role: "admin" | "member";
    };
    const serverUsers = (await findServerUsers()) as serverUsersOutput[];
    console.log(serverUsers);
    const userWithServers = users.map((user: UserItem) => {
      const filteredArray = serverUsers?.filter(
        (serverUser: serverUsersOutput) => {
          return user.id == serverUser.user_id
            ? { server_id: serverUser.server_id, role: serverUser.role }
            : false;
        }
      );
      return {
        ...user,
        servers: filteredArray,
      };
    });
    res.json(userWithServers);
  } catch (err) {
    if (err instanceof Error) {
      console.error("B", err);
      res.sendStatus(400);
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (await findUserById(
      parseInt(req.user?.userId)
    )) as unknown as UserItem;
    user.servers = await findServersByUser(parseInt(req.user?.userId));
    res.json(user);
  } catch (err) {
    console.error("A", err);
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
