import { sql, UniqueIntegrityConstraintViolationError } from "slonik";
import { pool } from "../config/env/test";
import { TimeStamps } from "../global/types";
import bcrypt from "bcryptjs";
import { UserItem } from "@chat-app-typescript/shared";
import { createServer } from "./Server";

class User implements UserItem, TimeStamps {
  username: string;
  email?: string;
  password?: string;
  created_at: Date | null;
  updated_at: Date | null;

  private constructor(_username: string, _email: string, _password: string) {
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.created_at = new Date();
    this.updated_at = null;
  }
  static setupTable = async () => {
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

    // checks if a server exists otherwise creates one
    if (
      !(await (
        await pool
      ).exists(sql`SELECT FROM information_schema.tables
    WHERE table_name = 'servers'`))
    ) {
      await createServer({ name: "First server", description: "Hello World!" });
    }

    if (
      !(await (
        await pool
      ).exists(sql`SELECT FROM information_schema.tables
    WHERE table_name = 'serverusers'`))
    ) {
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
    )
    `);

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
    }
  };

  static addToDatabase = async ({
    username,
    password,
    email,
  }: UserItem): Promise<UserItem | void> => {
    await this.setupTable();
    password = await bcrypt.hash(password || "", 10);

    try {
      const newUser = (await (
        await pool
      ).one(sql`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${email || ""}, ${password})
        RETURNING id, username, email, created_at, updated_at;
        `)) as unknown as UserItem;

      await (
        await pool
      ).one(sql`
        SELECT addusertoserver('member', 1, ${newUser.id as unknown as string});
        `);
    } catch (err) {
      if (err instanceof UniqueIntegrityConstraintViolationError) {
        throw new Error("Username or email already exists");
      }
    }
    return new User(username, email || "", password);
    // TODO: add a trigger function for the above insert so this is not needed.
  };

  static authorizeUser = async ({ username, password }: UserItem) => {
    const user = (await (
      await pool
    ).one(
      sql`SELECT * FROM users WHERE username = ${username}`
    )) as unknown as UserItem;

    return user &&
      password &&
      (await bcrypt.compare(password, user.password || ""))
      ? user
      : null;
  };
}

export const createUser = async (user: UserItem): Promise<UserItem | void> => {
  try {
    const newUser = (await User.addToDatabase(user)) as UserItem;
    delete newUser.password;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const findAllUsers = async (): Promise<UserItem[]> => {
  return (await (
    await pool
  ).any(
    sql`SELECT id, username, email, created_at FROM users;`
  )) as unknown as UserItem[];
};

export const findUserById = async (id: number): Promise<UserItem> => {
  return (await (
    await pool
  ).one(sql`SELECT id, username, email, created_at FROM users
  WHERE id = ${id};`)) as unknown as UserItem;
};

export const findUserByUsername = async (
  username: string
): Promise<UserItem> => {
  return (await (
    await pool
  ).one(sql`SELECT id, username FROM users
  WHERE username = ${username};`)) as unknown as UserItem;
};

export const updateUser = async () => {};
export const deleteUser = async () => {};

export default User;
