import { Request, Response } from "express";
import { ServerItem } from "@chat-app-typescript/shared";
import { createServer, findAllServers, findServerById } from "../models/Server";
import { requiredFieldsCheck } from ".";
import { createChannel, findChannelsByServer } from "../models/Channel";

export const handleNewServer = async (
  req: Request<ServerItem>,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, ["name", "description"]);

  if (missingFields.length === 0) {
    try {
      const server = await createServer(req.body, req?.user?.id);
      res.status(201).json(server);
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
  const id = parseInt(req.params.id);
  const server = await findServerById(id);
  server.channels = await findChannelsByServer(id)
  res.json(server);
};

export const editServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ Server: { message: "Server updated" } });
};

export const deleteServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "Server deleted" });
};
