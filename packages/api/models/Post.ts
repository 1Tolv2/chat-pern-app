import { sql } from "slonik";
import { pool } from ".";
import { TimeStamps } from "../global/types";
import { PostItem } from "@chat-app-typescript/shared";

class Post implements PostItem, TimeStamps {
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
  }

  static setupTable = async () => {
    await (
      await pool
    ).query(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text VARCHAR NOT NULL,
        channel_id INTEGER NOT NULL,
        FOREIGN KEY (channel_id) REFERENCES channels (id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP
        );
    `);
  };

  static addToDatabase = async ({
    text,
    user_id,
    channel_id,
  }: PostItem): Promise<PostItem> => {
    this.setupTable();
    await (
      await pool
    ).one(sql`
    INSERT INTO posts (text, user_id, channel_id)
    VALUES (${text}, ${user_id}, ${channel_id})
    RETURNING *;
        `);
    return new Post(text, user_id, channel_id);
  };
}

export const createPost = async (post: PostItem): Promise<PostItem | void> => {
  const newPost = (await Post.addToDatabase(post)) as PostItem;
  return newPost;
};

export const findAllPosts = async () => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM posts
  ORDER BY created_at DESC;`)) as unknown as PostItem[];
};

export const findAllPostsByUser = async (user_id: number) => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM posts
  WHERE user_id = ${user_id};`)) as unknown as PostItem[];
};

export const findPostById = async (id: number): Promise<PostItem> => {
  return (await (
    await pool
  ).one(sql`
  SELECT p.id, text, u.username AS user, user_id, c.name AS channel_name, channel_id, p.created_at, p.updated_at FROM posts AS p
  JOIN channels AS c ON channel_id = c.id
  JOIN users AS u ON user_id = u.id
  WHERE p.id = ${id};`)) as unknown as PostItem;
};

export const findAllPostsByChannel = async (
  channel_id: number
): Promise<PostItem[]> => {
  return (await (
    await pool
  )
    .any(sql`SELECT p.id, text, u.username AS user, user_id, p.created_at, p.updated_at FROM posts AS p
  JOIN users AS u ON user_id = u.id
  WHERE channel_id = ${channel_id}
  ORDER BY created_at ASC;`)) as unknown as PostItem[];
};

// export const updatePost = async () => {};
// export const deletePost = async () => {};

export default Post;
