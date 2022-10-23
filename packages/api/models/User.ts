import { sql } from "slonik";
import { pool } from ".";
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
  };
  static addToDatabase = async ({
    username,
    password,
    email,
  }: UserItem): Promise<UserItem | void> => {
    password = await bcrypt.hash(password || "", 10);
    const newUser = (await (
      await pool
    ).one(sql`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${email || ""}, ${password})
        RETURNING id, username, email, created_at, updated_at;
        `)) as unknown as UserItem;

    await createServer(
      { name: `${username}'s server`, description: "Hello World!" },
      newUser?.id
    );

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

export const createUser = async (user: UserItem): Promise<void> => {
  const newUser = (await User.addToDatabase(user)) as UserItem;
  delete newUser.password;
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

// export const updateUser = async () => {};
// export const deleteUser = async () => {};

export default User;
