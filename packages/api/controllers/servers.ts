import { Request, Response } from "express";
import {
  addToServerUsers,
  createServer,
  findAllServers,
  findServerById,
} from "../models/Server";
import { requiredFieldsCheck } from ".";
import { findChannelsByServer } from "../models/Channel";
import { UniqueIntegrityConstraintViolationError } from "slonik";
import { findUsersByServerId } from "../models/User";

export const handleNewServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, ["name", "description"]);
  console.log(req.user);
  if (missingFields.length === 0) {
    try {
      const server = await createServer(
        req.body.name,
        req.body.description || "",
        req?.user?.userId
      );
      res.status(201).json({
        server,
        message: "New server created",
      });
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        res
          .status(400)
          .json({ message: "A server with that name already exists." });
      } else {
        console.log(err);
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  } else {
    res.status(400).json({
      error: "Missing required fields",
      missingFields,
    });
  }
};

export const getAllServers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const servers = await findAllServers();
  res.json(servers);
};

export const getServerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const server = await findServerById(req.params.id);
    server.channels = await findChannelsByServer(req.params.id);
    server.users = await findUsersByServerId(server.id);
    res.json(server);
  } catch (er) {
    res.status(404).json({ message: "Server not found." });
  }
};

export const addMemberToServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await addToServerUsers(req.params.id, req.body.userId);
    res.json({ message: "Member added to server" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ error: err.message });
    }
  }
};
