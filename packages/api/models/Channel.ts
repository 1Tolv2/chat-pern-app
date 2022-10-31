import { sql } from "slonik";
import { pool } from ".";
import { TimeStamps } from "../global/types";
import {
  ChannelItem,
  NestedChannelItem,
  NestedPostItem,
} from "@chat-app-typescript/shared";

class Channel implements ChannelItem, TimeStamps {
  id: string;
  name: string;
  description: string;
  server_id: string;
  posts: NestedPostItem[];
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _id: string,
    _name: string,
    _description: string,
    _server_id: string
  ) {
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.server_id = _server_id;
    this.posts = [];
    this.created_at = new Date();
    this.updated_at = null;
  }

  static setupTable = async () => {
    await (
      await pool
    ).query(sql`
        CREATE TABLE IF NOT EXISTS channel (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(60) NOT NULL,
          description VARCHAR,
          server_id UUID NOT NULL,
          FOREIGN KEY (server_id) REFERENCES server(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT current_timestamp,
          updated_at TIMESTAMP,
          UNIQUE (name, server_id)
          );
      `);
  };

  static addToDatabase = async (
    server_id: string,
    name: string,
    description: string
  ) => {
    const newChannel = (await (
      await pool
    ).one(sql`
          INSERT INTO channel (name, server_id, description)
          VALUES (${name}, ${server_id}, ${description})
          RETURNING *;
          `)) as unknown as ChannelItem;
    return new Channel(
      newChannel.id,
      newChannel.name,
      "",
      newChannel.server_id
    );
  };
}

export const createChannel = async (
  server_id: string,
  name: string,
  description: string
): Promise<ChannelItem> => {
  return Channel.addToDatabase(server_id, name, description);
};

export const findAllChannels = async (): Promise<ChannelItem[]> => {
  const channels = (await (
    await pool
  ).any(sql`
  SELECT * from channel;`)) as unknown as ChannelItem[];
  return channels;
};

export const findChannelById = async (id: string): Promise<ChannelItem> => {
  const channel = (await (
    await pool
  ).one(sql`
  SELECT * from channel WHERE id = ${id}`)) as unknown as ChannelItem;
  return channel;
};

export const findChannelsByServer = async (
  id: string
): Promise<NestedChannelItem[]> => {
  return (await (
    await pool
  ).any(sql`
  SELECT id AS channel_id, name AS channel_name, description FROM channel WHERE server_id = ${id}`)) as unknown as NestedChannelItem[];
};

export default Channel;
