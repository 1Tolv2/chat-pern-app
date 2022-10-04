import crypto from "crypto";
import { sql } from "slonik";
import { pool } from "../config/env/test";
import { TimeStamps } from "../global/types";
import { PostAttributes } from "./Post";

interface ChannelAttributes {
  id?: number;
  name: string;
  description: string;
  posts?: PostAttributes[]; // post_ids
  server_id: number;
}

class Channel implements ChannelAttributes, TimeStamps {
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
    console.log("Setting up channels table");
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
  }

  #addToDatabase = async () => {
    await this.#setupTable();
    console.log("Adding channel to database");
    const newChannel = await (
      await pool
    ).one(sql`
          INSERT INTO channels (name, description)
          VALUES (${this.name}, ${this.description})
          RETURNING *;
          `);
    // Call on to create default channel general
    return newChannel;
  }
}

export const createChannel = async (channel: ChannelAttributes) => {
  return new Channel(channel.name, channel.description, channel.server_id);
};

export const findAllChannels = async () => {};
export const findChannelById = async () => {}; // with posts with users
export const updateChannel = async () => {};
export const deleteChannel = async () => {};

export default Channel;
