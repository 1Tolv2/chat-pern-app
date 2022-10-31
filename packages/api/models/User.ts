import { sql } from "slonik";
import { pool } from ".";
import bcrypt from "bcryptjs";
import { ServerItem, UserItem } from "@chat-app-typescript/shared";
import { createServer } from "./Server";

class User implements UserItem {
  id: string;
  username: string;
  email: string;
  password?: string;
  servers: ServerItem[];
  created_at?: Date;
  updated_at?: Date | null;

  private constructor(
    _id: string,
    _username: string,
    _email: string,
    _password: string,
    _created_at: Date
  ) {
    this.id = _id;
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.servers = [];
    this.created_at = _created_at;
    this.updated_at = null;
  }
  static setupTable = async () => {
    try {
      await (
        await pool
      ).query(sql`
      CREATE TABLE IF NOT EXISTS app_user (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(60) NOT NULL UNIQUE,
        email VARCHAR(60) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP
        );
    `);
    } catch (err) {
      console.error(err);
    }
  };
  static addToDatabase = async (
    username: string,
    password: string,
    email: string
  ): Promise<UserItem | void> => {
    password = await bcrypt.hash(password, 10);
    const newUser = (await (
      await pool
    ).one(sql`
        INSERT INTO app_user (username, email, password)
        VALUES (${username}, ${email}, ${password})
        RETURNING id, username, email, created_at, updated_at;
        `)) as unknown as UserItem;

    await createServer(`${username}'s server`, "Hello World", newUser?.id);

    return new User(
      newUser.id,
      username,
      email,
      password,
      newUser.created_at || new Date()
    );
    // TODO: add a trigger function for the above insert so this is not needed.
  };
  static authorizeUser = async (
    username: string,
    password: string
  ): Promise<UserItem | null> => {
    const user = (await (
      await pool
    ).one(
      sql`SELECT * FROM app_user WHERE username = ${username}`
    )) as unknown as UserItem;

    if (
      user &&
      password &&
      (await bcrypt.compare(password, user.password || ""))
    ) {
      delete user.password;
      return user;
    } else return null;
  };
}

export const createUser = async (
  username: string,
  password: string,
  email: string
): Promise<void> => {
  const newUser = await User.addToDatabase(username, email, password);
  delete newUser?.password;
};

export const findAllUsers = async (): Promise<UserItem[]> => {
  return (await (
    await pool
  ).any(
    sql`SELECT id, username, email, created_at FROM app_user;`
  )) as unknown as UserItem[];
};

export const findUserById = async (id: string): Promise<UserItem> => {
  return (await (
    await pool
  ).one(sql`SELECT id, username, email, created_at, updated_at FROM app_user
  WHERE id = ${id};`)) as unknown as UserItem;
};

export const findUserByUsername = async (
  username: string
): Promise<UserItem> => {
  return (await (
    await pool
  ).one(sql`SELECT id, username, email FROM app_user
  WHERE username = ${username};`)) as unknown as UserItem;
};

export default User;
