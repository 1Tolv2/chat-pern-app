import { sql, UniqueIntegrityConstraintViolationError } from "slonik";
import { pool } from "../config/env/test";
import { TimeStamps } from "../global/types";
import { createChannel } from "./Channel";
import { ServerItem } from "@chat-app-typescript/shared";
import { ServerTrait } from "@chat-app-typescript/shared/src/UserItem";

class Server implements ServerItem, TimeStamps {
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date | null;

  constructor(_name: string, _description: string) {
    this.name = _name;
    this.description = _description;
    this.created_at = new Date();
    this.updated_at = null;
  }

  static setupTable = async () => {
    await (
      await pool
    ).query(sql`
        CREATE TABLE IF NOT EXISTS servers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(60) NOT NULL UNIQUE,
          description VARCHAR,
          created_at TIMESTAMP DEFAULT current_timestamp,
          updated_at TIMESTAMP
          );
      `);
  };

  static addToDatabase = async ({
    name,
    description,
  }: ServerItem): Promise<ServerItem> => {
    await this.setupTable();
    try {
      const newServer = (await (
        await pool
      ).one(sql`
          INSERT INTO servers (name, description)
          VALUES (${name}, ${description})
          RETURNING *;
          `)) as unknown as ServerItem;

      if (newServer) {
        createChannel({
          name: "general",
          description: "General chat",
          server_id: newServer.id || 1,
        });
      }
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        throw new Error("A server with that name already exists");
      }
    }
    return new Server(name, description);
  };
}

export const createServer = async (
  server: ServerItem
): Promise<ServerItem | void> => {
  try {
    const newServer = Server.addToDatabase(server);
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
  ).any(sql`SELECT * FROM servers;`)) as unknown as ServerItem[];
};

export const findServerById = async (id: number): Promise<ServerItem> => {
  return (await (
    await pool
  ).one(sql`SELECT * FROM servers
  WHERE id = ${id};`)) as unknown as ServerItem;
};

export const findServersByUser = async (userId: number): Promise<ServerTrait[]> => {
  return (await (
    await pool
  ).any(sql`
SELECT su.user_id, su.role, su.server_id, s.name as server_name, s.description as server_description FROM serverusers as su
JOIN servers as s ON s.id = su.server_id
WHERE user_id = ${userId};`)) as unknown as ServerTrait[];
};

export const updateServer = async () => {};
export const deleteServer = async () => {};

export default Server;
