import { Request, Response } from "express";
import {
  UserItem,
  NestedUserItem,
  NestedServerItem,
} from "@chat-app-typescript/shared";
import { createUser, findAllUsers, findUserById } from "../models/User";
import { requiredFieldsCheck } from ".";
import { findServerUser, findAllServerUsers } from "../models/Server";
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

  const { username, email, password } = req.body;
  if (missingFields.length === 0) {
    try {
      await createUser(username, email, password);
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
    const serverUsers: NestedServerItem[] = await findAllServerUsers();

    const userWithServers = users.map((user: UserItem) => {
      const filteredArray: NestedServerItem[] = [];
      serverUsers?.map((serverUser) => {
        if (user.id == serverUser.user_id) {
          filteredArray.push({
            server_id: serverUser.server_id,
            role: serverUser.role,
            name: serverUser.name,
            description: serverUser.description,
          });
        }
      });

      return {
        ...user,
        servers: filteredArray,
      };
    });
    res.json(userWithServers);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.sendStatus(400);
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await findUserById(req.user?.userId);
    user.servers = await findServerUser(req.user?.userId);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
