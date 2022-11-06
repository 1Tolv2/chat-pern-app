import { Request, Response } from "express";
import { UniqueIntegrityConstraintViolationError } from "slonik";
import { MemberItem, UserItem } from "@chat-app-typescript/shared";
import { createUser, findAllUsers, findUserById } from "../models/User";
import responseMessages from "../global/responseMessages";
import { findUserServers, findAllUsersServers } from "../models/Server";
import { requiredFieldsCheck } from ".";

const { oops, missingReqFields, notUnique } = responseMessages.errorResponse;

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
      await createUser({ username: username.toLowerCase(), email, password });
      res.sendStatus(201);
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        res.status(notUnique.status);
        res.json({ error: `Username or email ${notUnique.message}` });
      } else if (err instanceof Error) {
        res.status(oops.status);
        res.json({ error: oops.message });
      }
    }
  } else {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
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
      res.status(oops.status);
      res.json({ error: oops.message });
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
      res.status(oops.status);
      res.json({ error: oops.message });
    }
  }
};
