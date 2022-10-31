import { Request, Response } from "express";
import { ServerItem } from "@chat-app-typescript/shared";
import {
  addToServerUsers,
  createServer,
  findAllServers,
  findServerById,
} from "../models/Server";
import { requiredFieldsCheck } from ".";
import { findChannelsByServer } from "../models/Channel";
import { UniqueIntegrityConstraintViolationError } from "slonik";

export const handleNewServer = async (
  req: Request<ServerItem>,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, ["name", "description"]);

  if (missingFields.length === 0) {
    try {
      const server = await createServer(
        req.body.name,
        req.body.description || "",
        req?.user?.id
      );
      res.status(201).json(server);
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        res
          .status(400)
          .json({ message: "A server with that name already exists." });
      } else {
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
  const id = req.params.id;
  const server = await findServerById(id);
  server.channels = await findChannelsByServer(id);
  res.json(server);
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
