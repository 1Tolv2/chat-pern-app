import { sql } from "slonik";
import { pool } from "../config/env/test";
import { TimeStamps } from "../global/types";

export interface PostAttributes {
  id?: number | null;
  text: string;
  user_id: number;
  channel_id: number;
}

class Post implements PostAttributes, TimeStamps {
  id?: number | null;
  text: string;
  user_id: number;
  channel_id: number;
  created_at: Date;
  updated_at: Date | null;

  constructor(_text: string, _user_id: number, _channel_id: number) {
    this.text = _text;
    this.user_id = _user_id;
    this.channel_id = _channel_id;
    this.created_at = new Date();
    this.updated_at = null;
    this.#addToDatabase();
  }

  #setupTable = async () => {
    await (
      await pool
    ).query(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text VARCHAR NOT NULL,
        channel_id SERIAL NOT NULL,
        FOREIGN KEY (channel_id) REFERENCES channels (id) ON DELETE CASCADE,
        user_id SERIAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP
        );
    `);
  };

  #addToDatabase = async (): Promise<PostAttributes> => {
    this.#setupTable();

    const newPost = await (
      await pool
    ).one(sql`
    INSERT INTO posts (text, user_id, channel_id)
    VALUES (${this.text}, ${this.user_id}, ${this.channel_id})
    RETURNING *;
        `);
    return newPost as unknown as PostAttributes;
  };
}

export const createPost = async (post: PostAttributes) => {
  return new Post(post.text, post.user_id, post.channel_id);
};

export const findAllPosts = async () => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM posts;`)) as unknown as PostAttributes[];
};

export const findAllPostsByUser = async (user_id: number) => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM posts
  WHERE user_id = ${user_id};`)) as unknown as PostAttributes[];
};

export const findPostById = async (id: number): Promise<PostAttributes> => {
  // with user and channel
  return await (await pool).one(sql`
  SELECT p.id, text, u.username AS user, user_id, c.name AS channel_name, channel_id, p.created_at, p.updated_at FROM posts AS p
  JOIN channels AS c ON channel_id = c.id
  JOIN users AS u ON user_id = u.id;
  `) as unknown as PostAttributes;
};

export const findAllPostsByChannel = async (channel_id: number): Promise<PostAttributes[]> => {
  return await (await pool).any(sql`SELECT p.id, text, u.username AS user, user_id, p.created_at, p.updated_at FROM posts AS p
  JOIN users AS u ON user_id = u.id
  WHERE channel_id = ${channel_id};`) as unknown as PostAttributes[]
}

export const updatePost = async () => {};
export const deletePost = async () => {};

export default Post;
