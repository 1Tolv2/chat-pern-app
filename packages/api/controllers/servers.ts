import { Request, Response } from "express";
import {
  addToServerUsers,
  Admin,
  createServer,
  findAllServers,
  findServerAdmins,
  findServerById,
} from "../models/Server";
import { requiredFieldsCheck } from ".";
import { findChannelsByServer } from "../models/Channel";
import { NotFoundError, UniqueIntegrityConstraintViolationError } from "slonik";
import { findUsersByServerId } from "../models/User";
import { ServerItem } from "@chat-app-typescript/shared";

export const handleNewServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, ["name", "description"]);

  if (missingFields.length === 0) {
    try {
      const server = await createServer({
        name: req.body.name,
        description: req.body.description || "",
        admin_id: req.user?.user_id,
      });
      res.status(201);
      res.json({
        server,
        message: "New server created",
      });
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        res.status(409);
        res.json({ error: "A server with that name already exists." });
      } else {
        res.status(500);
        res.json({ error: "Something went wrong." });
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

export const getAllServers = async (
  req: Request,
  res: Response
): Promise<void> => {
  let servers: ServerItem[] = [];
  let admins: Admin[] = [];
  try {
    servers = await findAllServers();
    admins = await findServerAdmins();

    servers.map((server) => {
      const admin = admins?.find((admin) => server.id === admin?.server_id);
      server.admin_id = admin ? admin.admin_id : "";
    });

    res.json(servers);
  } catch (err) {
    res.status(500);
    res.json({ error: "Something went wrong." });
  }
};

export const getServerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const server = await findServerById(req.params.id);
    server.channels = await findChannelsByServer(req.params.id);
    server.members = [];

    const serverMembers = await findUsersByServerId(server.id);

    serverMembers.map((member) => {
      server.members.push({
        id: member.id,
        role: member.role,
      });
      if (member.role === "admin") {
        server.admin_id = member.id;
      }
    });
    res.json(server);
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404);
      res.json({ error: "Server not found" });
    } else if (err instanceof Error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
};

export const addMemberToServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await addToServerUsers(req.params.id, req.body.user_id);
    res.json({ message: "Member added to server" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
};
