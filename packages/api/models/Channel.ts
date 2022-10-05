import { sql } from "slonik";
import { pool } from "../config/env/test";
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
    this.#addToDatabase();
  }

  #setupTable = async () => {
    await (
      await pool
    ).query(sql`
        CREATE TABLE IF NOT EXISTS channels (
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
    const newChannel = await (
      await pool
    ).one(sql`
          INSERT INTO channels (name, description)
          VALUES (${this.name}, ${this.description})
          RETURNING *;
          `);
    // Call on to create default channel general
    return newChannel;
  };
}

export const createChannel = async (channel: ChannelItem) => {
  return new Channel(channel.name, channel.description, channel.server_id);
};

export const findAllChannels = async (): Promise<ChannelItem[]> => {
  const channels = (await (
    await pool
  ).any(sql`
  SELECT * from channels;`)) as unknown as ChannelItem[];
  return channels;
};

export const findChannelById = async (
  id: number
): Promise<ChannelItem> => {
  const channel = (await (
    await pool
  ).one(sql`
  SELECT * from channels WHERE id = ${id}`)) as unknown as ChannelItem;
  return channel;
}; // with posts with users'

export const updateChannel = async () => {};
export const deleteChannel = async () => {};

export default Channel;
