import { sql } from "slonik";
import { pool } from ".";
import { TimeStamps } from "../global/types";
import { ChannelItem } from "@chat-app-typescript/shared";

class Channel implements ChannelItem, TimeStamps {
  name: string;
  description: string;
  server_id: number;
  created_at: Date;
  updated_at: Date | null;

  constructor(_name: string, _description: string, _server_id: number) {
    this.name = _name;
    this.description = _description;
    this.server_id = _server_id;
    this.created_at = new Date();
    this.updated_at = null;
  }

  static setupTable = async () => {
    await (
      await pool
    ).query(sql`
        CREATE TABLE IF NOT EXISTS channels (
          id SERIAL PRIMARY KEY,
          name VARCHAR(60) NOT NULL,
          description VARCHAR,
          server_id SERIAL NOT NULL,
          FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT current_timestamp,
          updated_at TIMESTAMP,
          UNIQUE (name, server_id)
          );
      `);
  };

  static addToDatabase = async ({
    name,
    description,
    server_id,
  }: ChannelItem) => {
    const newChannel = await (
      await pool
    ).one(sql`
          INSERT INTO channels (name, description, server_id)
          VALUES (${name}, ${description}, ${server_id})
          RETURNING *;
          `);
    return newChannel;
  };
}

export const createChannel = async (channel: ChannelItem) => {
  return Channel.addToDatabase(channel);
};

export const findAllChannels = async (): Promise<ChannelItem[]> => {
  const channels = (await (
    await pool
  ).any(sql`
  SELECT * from channels;`)) as unknown as ChannelItem[];
  return channels;
};

export const findChannelById = async (id: number): Promise<ChannelItem> => {
  const channel = (await (
    await pool
  ).one(sql`
  SELECT * from channels WHERE id = ${id}`)) as unknown as ChannelItem;
  return channel;
};

export const findChannelsByServer = async (
  id: number
): Promise<ChannelItem[]> => {
  return (await (
    await pool
  ).any(sql`
  SELECT id, name, description FROM channels WHERE server_id = ${id}`)) as unknown as ChannelItem[];
};

// export const updateChannel = async () => {};
// export const deleteChannel = async () => {};

export default Channel;
