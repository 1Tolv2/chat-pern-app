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

/**
 * serverUsers TABLE
 * id INT SERIAL PRIMARY KEY,
 * user_id INT NOT NULL
 * FOREGIN KEY (user_id) REFERENCES user(id)
 * server_id INT NOT NULL
 * FOREGIN KEY (server_id) REFERENCES server(id)
 */

export interface UserAttributes {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  servers?: ServerTrait[];
}

export interface UserDBAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

class User implements UserAttributes, TimeStamps {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  servers: ServerTrait[];
  created_at: Date | null;
  updated_at: Date | null;

  constructor(_username: string, _email: string, _password: string) {
    // this.id = 0;
    this.username = _username;
    this.email = _email;
    this.password = _password;
    this.servers = [{ serverName: "general", role: "user" }];
    this.created_at = new Date();
    this.updated_at = null;
    this.#addToDatabase(); // private, not reachable outside the class
  }
  #addToDatabase = async (): Promise<UserAttributes> => {
    const { username, email, password } = this;
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const newUser = (await (
      await pool
    ).one(sql`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${email}, ${hashedPassword})
        RETURNING *;
        `)) 

    // TODO: add a trigger function for the above insert so this is not needed.
    await (
      await pool
    ).one(sql`
        SELECT addusertoserver(${newUser.id});
        `);
    return newUser as unknown as UserAttributes;
  };
}

export const createUser = async (user: UserAttributes) => {
  return new User(user.username, user.email, user.password);
};

export const findAllUsers = async () => {
  return await (await pool).any(sql`SELECT * FROM users`);
};

// with posts and servers
export const findUserById = async (id: number) => {
  console.log(id);
  const user = (
    await (await pool).any(sql`SELECT * FROM users WHERE id = ${id}`)
  )[0];
  const posts = await (
    await pool
  )
    .any(sql`SELECT p.id, p.text, channels.name as channel, p.created_at, p.updated_at FROM posts AS p 
  JOIN channels ON channels.id = p.channel_id
  WHERE p.user_id = ${id}
  ORDER BY p.created_at DESC;`);
  return { ...user, posts };
};

export const updateUser = async () => {};
export const deleteUser = async () => {};

export default User;
