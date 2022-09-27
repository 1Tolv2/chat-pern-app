import crypto from "crypto";
import { sql } from "slonik";
import { pool } from "../config/env/test";
import { ServerTrait, TimeStamps } from "../global/types";

/* user TABLE
 * id INT SERIAL PRIMARY KEY,
 * username VARCHAR(60) NOT NULL UNIQUE,
 * email VARCHAR NOT NULL,
 * password VARCHAR NOT NULL
 * server_id SERIAL NOT NULL
 * FOREGIN KEY (server_id) REFERENCES server(id)
 * created_at TIMESTAMP NOT NULL
 * updated_at TIMESTAMP
 */

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  servers?: ServerTrait[];
}

class User implements UserAttributes, TimeStamps {
  id: number;
  username: string;
  email: string;
  password: string;
  servers: ServerTrait[];
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _username: string,
    _email: string,
    _password: string,
    _servers?: ServerTrait[]
  ) {
    this.id = 0;
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.servers = _servers || [{ serverName: "general", role: "user" }];
    this.created_at = new Date();
    this.updated_at = null;
  }
}

export const createUser = async (
  user: UserAttributes
): Promise<UserAttributes> => {
  const { username, email, password } = user;

  await (
    await pool
  )
    .any(sql`INSERT INTO users (username, email, password, server_id, role_id, created_at)
  VALUES (${username}, ${email}, ${password}, 1, 1, current_timestamp);`);

  const data = (
    await (
      await pool
    ).any(sql`SELECT * FROM users WHERE username = ${username}`)
  )[0] as unknown as UserAttributes;
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    password: data.password,
  };
};

export const findAllUsers = async () => {
  return await (await pool).any(sql`SELECT * FROM users`);
};
export const findUserById = async () => {}; // with posts and servers
export const updateUser = async () => {};
export const deleteUser = async () => {};

export default User;
