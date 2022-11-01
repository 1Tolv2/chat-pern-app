import { Request, Response } from "express";
import {
  addToServerUsers,
  createServer,
  findAllServers,
  findServerAdmins,
  findServerById,
} from "../models/Server";
import { requiredFieldsCheck } from ".";
import { findChannelsByServer } from "../models/Channel";
import { UniqueIntegrityConstraintViolationError } from "slonik";
import { findUsersByServerId } from "../models/User";
import { MemberItem, ServerItem } from "@chat-app-typescript/shared";

export const handleNewServer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const missingFields = requiredFieldsCheck(req.body, ["name", "description"]);
  console.log(req.user);
  if (missingFields.length === 0) {
    try {
      const server = await createServer({
        name: req.body.name,
        description: req.body.description || "",
        admin_id: req.user?.id,
      });
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
  let servers: ServerItem[] = [];
  let admins: any[] = [];
  try {
    servers = await findAllServers();
    admins = await findServerAdmins();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }

  servers.map((server) => {
    server.admin_id = admins.find(
      (admin) => server.id === admin.server_id
    ).admin_id;
  });

  res.json(servers);
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
    console.log(err);
    res.status(404).json({ message: "Server not found." });
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
      res.status(409).json({ error: err.message });
    }
  }
};
