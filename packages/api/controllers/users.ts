import { Request, Response } from "express";
import { MemberItem, UserItem } from "@chat-app-typescript/shared";
import { createUser, findAllUsers, findUserById } from "../models/User";
import { requiredFieldsCheck } from ".";
import { findUserServers, findAllUsersServers } from "../models/Server";
import { UniqueIntegrityConstraintViolationError } from "slonik";

export const handleNewUser = async (
  req: Request<Partial<UserItem>>,
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
      await createUser({ username, email, password });
      res.sendStatus(201);
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        res.status(409);
        res.json({ error: "Username or email already exists" });
      } else if (err instanceof Error) {
        res.status(400);
        res.json({ error: err.message });
      }
    }
  } else {
    res.status(400);
    res.json({
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
    const usersServers: MemberItem[] = await findAllUsersServers();

    const usersWithServers = users.map((user) => {
      const memberOfServers: MemberItem[] = [];

      usersServers.map((server) => {
        if (user.id === server.user_id) {
          memberOfServers.push({
            id: server.id,
            name: server.name,
            description: server.description,
            role: server.role,
          });
        }
      });

      return {
        ...user,
        servers: memberOfServers,
      };
    });

    res.json(usersWithServers);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400);
      res.json({ error: err.message });
    }
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await findUserById(req.user?.user_id);
    user.servers = await findUserServers(req.user?.user_id);
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400);
      res.json({ error: err.message });
    }
  }
};
