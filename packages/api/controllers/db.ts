import { sql } from "slonik";
import dotenv from "dotenv";
import User from "../models/User";
import Server from "../models/Server";
import Channel from "../models/Channel";
import Post from "../models/Post";
import { pool } from "../models";

dotenv.config();

const configDatabase = async () => {
  await (
    await pool
  ).query(sql`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
};

const createAddUserToServerFunction = async () => {
  await (
    await pool
  ).query(sql`
        CREATE OR REPLACE FUNCTION addusertoserver(text, UUID, UUID) RETURNS void
        AS $$
        INSERT INTO serveruser (role, server_id, user_id)
        VALUES ($1, $2, $3)
        $$
        LANGUAGE SQL;
      `);
};

const createServerUsersTable = async () => {
  await (
    await pool
  ).query(sql`
    CREATE TABLE IF NOT EXISTS serveruser (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE,
      server_id UUID NOT NULL,
      FOREIGN KEY (server_id) REFERENCES server(id) ON DELETE CASCADE,
      role VARCHAR(60) NOT NULL CHECK (role = 'admin' OR role = 'member'),
      UNIQUE (user_id, server_id)
    );
    `);
  createAddUserToServerFunction();
};

export const handleDBSetup = async () => {
  await configDatabase();
  await User.setupTable();
  await Server.setupTable();
  await Channel.setupTable();
  await Post.setupTable();
  await createServerUsersTable();
};
