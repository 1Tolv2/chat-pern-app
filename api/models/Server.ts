import { sql } from "slonik";
import { pool } from "../config/env/test";
import { ServerTrait, TimeStamps } from "../global/types";

/* server TABLE
 * id INT SERIAL PRIMARY KEY,
 * name VARCHAR(60) NOT NULL UNIQUE,
 * description VARCHAR,
 * created_at TIMESTAMP,
 * updated_at TIMESTAMP
 */

interface ServerAttributes {
  id?: number;
  name: string;
  description: string;
  channels?: ServerTrait[]; // channel_ids
  users?: string[]; // user_ids
}

class Server implements ServerAttributes, TimeStamps {
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date | null;

  constructor(_name: string, _description: string) {
    this.name = _name;
    this.description = _description;
    this.created_at = new Date();
    this.updated_at = null;
    this.#addToDatabase();
  }
  #setupTable = async () => {
    console.log("Setting up servers table");
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
  
  #addToDatabase = async () => {
    await this.#setupTable();
    console.log("Adding server to database");
    const newServer = await (
      await pool
    ).one(sql`
          INSERT INTO servers (name, description)
          VALUES (${this.name}, ${this.description})
          RETURNING *;
          `);
    // Call on to create default channel general
    return newServer;
  };
}

export const createServer = async (server: ServerAttributes) => {
  return new Server(server.name, server.description);
};
export const findAllServers = async () => {
  return await (await pool).any(sql`SELECT * FROM servers;`);
};
export const findServerById = async () => {}; // with channels and users
export const updateServer = async () => {};
export const deleteServer = async () => {};

export default Server;
