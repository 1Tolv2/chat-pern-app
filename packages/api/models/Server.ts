import { sql } from "slonik";
import { pool } from ".";
import { TimeStamps } from "../global/types";
import { createChannel } from "./Channel";
import {
  NestedChannelItem,
  ServerItem,
  ServerUserItem,
} from "@chat-app-typescript/shared";
import { NestedUserItem } from "@chat-app-typescript/shared/src/UserItem";

class Server implements ServerItem, TimeStamps {
  id: string;
  name: string;
  description: string;
  channels: NestedChannelItem[];
  users: NestedUserItem[];
  created_at: Date;
  updated_at: Date | null;

  constructor(_id: string, _name: string, _description: string) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.channels = [];
    this.users = [];
    this.created_at = new Date();
    this.updated_at = null;
  }

  static setupTable = async () => {
    await (
      await pool
    ).query(sql`
        CREATE TABLE IF NOT EXISTS server (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(60) NOT NULL UNIQUE,
          description VARCHAR,
          created_at TIMESTAMP DEFAULT current_timestamp,
          updated_at TIMESTAMP
          );
      `);
  };

  static addToDatabase = async (
    name: string,
    description: string,
    user_id: string
  ): Promise<ServerItem> => {
    const newServer = (await (
      await pool
    ).one(sql`
          INSERT INTO server (name, description)
          VALUES (${name}, ${description})
          RETURNING *;
          `)) as unknown as ServerItem;
    await (
      await pool
    ).one(sql`
            SELECT addusertoserver('admin', ${newServer.id}, ${user_id || 1});
            `);
    if (newServer) {
      createChannel(newServer.id, "general", "General chat");
    }
    return new Server(newServer?.id || "", name, description);
  };
}

export const createServer = async (
  name: string,
  description: string,
  user_id: string
): Promise<ServerItem | void> => {
  try {
    const newServer = await Server.addToDatabase(name, description, user_id);
    return newServer;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const findAllServers = async (): Promise<ServerItem[]> => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM server;`)) as unknown as ServerItem[];
};

export const findServerById = async (id: string): Promise<ServerItem> => {
  return (await (
    await pool
  ).one(sql`SELECT * FROM server
  WHERE id = ${id};`)) as unknown as ServerItem;
};

export const findServersByUser = async (
  user_id: string
): Promise<ServerItem[]> => {
  return (await (
    await pool
  ).any(sql`
SELECT su.user_id, su.role, su.server_id as id, s.name, s.description as server_description FROM serveruser as su
JOIN server as s ON s.id = su.server_id
WHERE user_id = ${user_id};`)) as unknown as ServerItem[];
};

export const findServerUsers = async () => {
  return await (
    await pool
  ).any(sql`SELECT user_id, server_id, role FROM serveruser;`);
};

export const addToServerUsers = async (
  server_id: string,
  user_id: string
): Promise<ServerUserItem> => {
  return (await (
    await pool
  ).any(sql`
  INSERT INTO serveruser (user_id, server_id, role)
  VALUES (${user_id}, ${server_id}, 'member');
  `)) as unknown as ServerUserItem;
};

export default Server;
