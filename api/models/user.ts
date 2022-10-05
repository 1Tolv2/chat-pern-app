import crypto from "crypto";
import { sql, UniqueIntegrityConstraintViolationError } from "slonik";
import { pool } from "../config/env/test";
import { ErrorMessage, ServerTrait, TimeStamps } from "../global/types";
import bcrypt from "bcryptjs";
import { PostAttributes } from "./Post";
import { createServer } from "./Server";

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password?: string;
  posts?: PostAttributes[];
  servers?: ServerTrait[];
}

class User implements UserAttributes, TimeStamps {
  username: string;
  email: string;
  password?: string;
  created_at: Date | null;
  updated_at: Date | null;

  constructor(_username: string, _email: string, _password: string) {
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.created_at = new Date();
    this.updated_at = null;
    this.#setupTable();
  }
  #setupTable = async () => {
    console.log("Setting up users table");
    await (
      await pool
    ).query(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username VARCHAR(60) NOT NULL UNIQUE,
        email VARCHAR(60) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP
        );
    `);

    console.log("Checking for Servers table");
    // checks if a server exists otherwise creates one
    if (
      !(await (
        await pool
      ).exists(sql`SELECT FROM information_schema.tables
    WHERE table_name = 'servers'`))
    ) {
      console.log("No servers table found");
      await createServer({ name: "First server", description: "Hello World!" });
    }

    if (
      !(await (
        await pool
      ).exists(sql`SELECT FROM information_schema.tables
    WHERE table_name = 'serverusers'`))
    ) {
      console.log("Creating serverUsers table");
      await (
        await pool
      ).query(sql`
    CREATE TABLE IF NOT EXISTS serverusers (
      id INTEGER PRIMARY KEY,
      user_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      server_id INT NOT NULL,
      FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE,
      role VARCHAR(60) NOT NULL CHECK (role = 'admin' OR role = 'member')
    )
    `);

      console.log("Creating addusertoserver function");
      await (
        await pool
      ).query(sql`
      CREATE OR REPLACE FUNCTION addusertoserver(str varchar, num int) RETURNS void
      AS $$
      INSERT INTO serverusers (role, server_id, user_id)
      VALUES (str, 1, num)
      $$
      LANGUAGE SQL;
    `);
    }
  };

  async addToDatabase(): Promise<UserAttributes | void> {

    const hashedPassword = await bcrypt.hash(this.password || "", 10);
    this.password = hashedPassword;

    console.log("Adding user to database");
    try {
     const newUser = (await (
        await pool
      ).one(sql`
        INSERT INTO users (username, email, password)
        VALUES (${this.username}, ${this.email}, ${hashedPassword})
        RETURNING id, username, email, created_at, updated_at;
        `)) as unknown as UserAttributes;
      await (
        await pool
      ).one(sql`
        SELECT addusertoserver('member', ${newUser.id as unknown as string});
        `);
    return newUser
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        throw new Error("Username or email already exists");
      }
    }
    // TODO: add a trigger function for the above insert so this is not needed.
  }

  static authorizeUser = async (username: string, password: string) => {
    const user = (await (
      await pool
    ).one(
      sql`SELECT * FROM users WHERE username = ${username}`
    )) as unknown as UserAttributes;

    return user && password && (await bcrypt.compare(password, user.password || ""))
      ? user
      : null;
  };
}

export const createUser = async (user: UserAttributes): Promise<ErrorMessage | UserAttributes> => {
  const newUser = new User(
    user.username.toLowerCase(),
    user.email,
    user.password || ""
  );
  try {
    await newUser.addToDatabase();
  } catch (err) {
    if (err instanceof Error) {
      const error: ErrorMessage = {
        error: err.message ? err.message : "Something went wrong",
      };
      return error;
    }
  }
  return newUser;
};

export const findAllUsers = async () => {
  return await (
    await pool
  ).any(sql`SELECT id, username, email, created_at FROM users;`);
};

export const findUserById = async (id: number) => {
  return await (
    await pool
  ).one(sql`SELECT id, username, email, created_at FROM users
  WHERE id = ${id};`);
};

export const findUserByUsername = async (username: string) => {
  return await (
    await pool
  ).one(sql`SELECT id, username FROM users
  WHERE username = ${username};`);
};

export const updateUser = async () => {};
export const deleteUser = async () => {};

export default User;
