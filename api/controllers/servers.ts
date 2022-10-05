import { Request, Response } from "express";
import {
  createServer,
  findAllServers,
  findServerById,
  ServerAttributes,
} from "../models/Server";

export const handleNewServer = async (
  req: Request<ServerAttributes>,
  res: Response
) => {
  const { name, description } = req.body;
  const server = await createServer({ name, description });
  res.json(server);
};

export const getAllServers = async (req: Request, res: Response) => {
  const servers = await findAllServers();
  res.json(servers);
};
export const getServerById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const server = await findServerById(id);
  res.json(server);
}; // get /:id with Servers

export const editServer = async (req: Request, res: Response) => {
  res.json({ Server: { message: "Server updated" } });
};

export const deleteServer = async (req: Request, res: Response) => {
  res.json({ message: "Server deleted" });
};
