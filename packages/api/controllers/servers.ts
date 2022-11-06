import { Request, Response } from "express";
import { NotFoundError, UniqueIntegrityConstraintViolationError } from "slonik";
import { ServerItem } from "@chat-app-typescript/shared";
import responseMessages from "../global/responseMessages";
import {
  addToServerUsers,
  Admin,
  createServer,
  findAllServers,
  findServerAdmins,
  findServerById,
} from "../models/Server";
import { findChannelsByServer } from "../models/Channel";
import { findUsersByServerId } from "../models/User";
import { requiredFieldsCheck } from ".";

const { notUnique, oops, missingReqFields, notFound } =
  responseMessages.errorResponse;

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
        res.status(notUnique.status);
        res.json({ error: "Server " + notUnique.message });
      } else {
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
    res.status(oops.status);
    res.json({ error: oops.message });
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
      res.status(notFound.status);
      res.json({ error: "Server " + notFound.message });
    } else if (err instanceof Error) {
      res.status(oops.status);
      res.json({ error: oops.message });
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
      res.status(oops.status);
      res.json({ error: oops.message });
    }
  }
};
