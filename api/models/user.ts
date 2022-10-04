import crypto from "crypto";
import { sql } from "slonik";
import { pool } from "../config/env/test";
import { ServerTrait, TimeStamps } from "../global/types";
import bcrypt from "bcryptjs";
import { PostAttributes } from "./Post";
import { createServer } from "./Server";

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

/**
 * serverUsers TABLE
 * id INT SERIAL PRIMARY KEY,
 * user_id INT NOT NULL
 * FOREGIN KEY (user_id) REFERENCES user(id)
 * server_id INT NOT NULL
 * FOREGIN KEY (server_id) REFERENCES server(id)
 */

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  posts?: PostAttributes[];
  servers?: ServerTrait[];
}

class User implements UserAttributes, TimeStamps {
  username: string;
  email: string;
  password: string;
  created_at: Date | null;
  updated_at: Date | null;

  constructor(_username: string, _email: string, _password: string) {
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.created_at = new Date();
    this.updated_at = null;
    this.#addToDatabase(); // private, not reachable outside the class
  }
  #setupTable = async () => {
    await (
      await pool
    ).query(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(60) NOT NULL UNIQUE,
        email VARCHAR(60) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP
        );
    `);
    if (!(await (await pool).exists(sql`SELECT * FROM servers`))) {
      createServer({ name: "First server", description: "Hello World!" });
    }
    await (
      await pool
    ).query(sql`
      CREATE OR REPLACE FUNCTION addusertoserver(int) RETURNS void
      AS $$
      INSERT INTO serverusers (server_id, user_id)
      VALUES (1, $1)
      $$
      LANGUAGE SQL;
    `);
  };
  #addToDatabase = async (): Promise<UserAttributes> => {
    this.#setupTable();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    const newUser = await (
      await pool
    ).one(sql`
        INSERT INTO users (username, email, password)
        VALUES (${this.username}, ${this.email}, ${hashedPassword})
        RETURNING *;
        `);

    // TODO: add a trigger function for the above insert so this is not needed.
    await (
      await pool
    ).one(sql`
        SELECT addusertoserver(${newUser.id});
        `);
    return newUser as unknown as UserAttributes;
  };

  static authorizeUser = async (username: string, password: string) => {
    const user = (await (
      await pool
    ).one(
      sql`SELECT * FROM users WHERE username = ${username}`
    )) as unknown as UserAttributes;

    return user && password && (await bcrypt.compare(password, user.password))
      ? user
      : null;
  };
}

export const createUser = async (user: UserAttributes) => {
  return new User(user.username, user.email, user.password);
};

export const findAllUsers = async () => {
  return await (
    await pool
  ).any(sql`SELECT id, username, email, created_at FROM users;`);
};

export const findUserById = async (id: number) => {
  return await (
    await pool
  ).any(sql`SELECT id, username, email, created_at FROM users
  WHERE id = ${id};`);
};

export const updateUser = async () => {};
export const deleteUser = async () => {};

export default User;
