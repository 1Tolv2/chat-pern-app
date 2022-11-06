import { sql } from "slonik";
import { pool } from ".";
import { TimeStamps } from "../global/types";
import { createChannel } from "./Channel";
import {
  ChannelItem,
  MemberItem,
  ServerItem,
} from "@chat-app-typescript/shared";

class Server implements ServerItem, TimeStamps {
  id: string;
  name: string;
  description: string;
  admin_id: string;
  channels: ChannelItem[];
  members: MemberItem[];
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _id: string,
    _name: string,
    _description: string,
    _admin_id: string
  ) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.admin_id = _admin_id;
    this.channels = [];
    this.members = [];
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
    server: Partial<ServerItem>
  ): Promise<ServerItem> => {
    const description = server.description || "";
    const name = server.name || "";
    const admin_id = server.admin_id || "";
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
            SELECT addusertoserver('admin', ${newServer.id}, ${admin_id});
            `);
    if (newServer) {
      await createChannel({
        server_id: newServer.id,
        name: "general",
        description: "General chat",
      });
    }
    return new Server(newServer?.id, name, description, admin_id);
  };
}

export const createServer = async (
  server: Partial<ServerItem>
): Promise<ServerItem | void> => {
  try {
    const newServer = await Server.addToDatabase(server);
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

export const findUserServers = async (
  user_id: string
): Promise<MemberItem[]> => {
  return (await (
    await pool
  ).any(sql`
SELECT su.server_id AS id, s.name, s.description, su.role FROM serveruser AS su
JOIN server AS s ON s.id = su.server_id
WHERE user_id = ${user_id};`)) as unknown as MemberItem[];
};

export const findAllUsersServers = async (): Promise<MemberItem[]> => {
  return (await (
    await pool
  )
    .any(sql`SELECT su.user_id, su.server_id AS id, s.name, s.description, su.role FROM serveruser as su
  JOIN server as s ON s.id = su.server_id;`)) as unknown as MemberItem[];
};

export const addToServerUsers = async (
  server_id: string,
  user_id: string
): Promise<void> => {
  await (
    await pool
  ).any(sql`
  INSERT INTO serveruser (user_id, server_id, role)
  VALUES (${user_id}, ${server_id}, 'member');
  `);
};

export type Admin = { server_id: string; admin_id: string };

export const findServerAdmins = async (): Promise<Admin[]> => {
  return (await (
    await pool
  ).any(
    sql`SELECT server_id, user_id AS admin_id FROM serveruser WHERE role = 'admin';`
  )) as unknown as Admin[];
};
export default Server;
