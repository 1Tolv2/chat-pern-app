import { createPool, sql } from "slonik";
import dotenv from "dotenv";
import User from "../models/User";
import Server from "../models/Server";
import Channel from "../models/Channel";
import Post from "../models/Post";
import { pool } from "../app";

dotenv.config();

const createAddUserToServerFunction = async () => {
  await (
    await pool
  ).query(sql`
        CREATE OR REPLACE FUNCTION addusertoserver(text, numeric, numeric) RETURNS void
        AS $$
        INSERT INTO serverusers (role, server_id, user_id)
        VALUES ($1, $2, $3)
        $$
        LANGUAGE SQL;
      `);
};

const createServerUsersTable = async () => {
  await (
    await pool
  ).query(sql`
    CREATE TABLE IF NOT EXISTS serverusers (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      server_id INT NOT NULL,
      FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE,
      role VARCHAR(60) NOT NULL CHECK (role = 'admin' OR role = 'member'),
      UNIQUE (user_id, server_id)
    );
    `);
  createAddUserToServerFunction();
};

export const handleDBSetup = async () => {
  await User.setupTable();
  await Server.setupTable();
  await Channel.setupTable();
  await Post.setupTable();
  await createServerUsersTable();
};
