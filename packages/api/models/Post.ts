import { sql } from "slonik";
import { pool } from ".";
import { TimeStamps } from "../global/types";
import { PostItem } from "@chat-app-typescript/shared";
import { NestedPostItem } from "@chat-app-typescript/shared/src/PostItem";

class Post implements PostItem, TimeStamps {
  id: string;
  text: string;
  user_id: string;
  channel_id: string;
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _id: string,
    _text: string,
    _user_id: string,
    _channel_id: string,
    _created_at: Date
  ) {
    this.id = _id;
    this.text = _text;
    this.user_id = _user_id;
    this.channel_id = _channel_id;
    this.created_at = _created_at;
    this.updated_at = null;
  }

  static setupTable = async () => {
    await (
      await pool
    ).query(sql`
      CREATE TABLE IF NOT EXISTS post (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        text VARCHAR NOT NULL,
        channel_id UUID NOT NULL,
        FOREIGN KEY (channel_id) REFERENCES channel(id) ON DELETE CASCADE,
        user_id UUID NOT NULL,
        FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT current_timestamp,
        updated_at TIMESTAMP
        );
    `);
  };

  static addToDatabase = async (
    text: string,
    user_id: string,
    channel_id: string
  ): Promise<PostItem> => {
    this.setupTable();
    const newPost = (await (
      await pool
    ).one(sql`
    INSERT INTO post (text, user_id, channel_id)
    VALUES (${text}, ${user_id}, ${channel_id})
    RETURNING *;
        `)) as unknown as PostItem;
    return new Post(newPost.id, text, user_id, channel_id, newPost.created_at);
  };
}

export const createPost = async (
  text: string,
  user_id: string,
  channel_id: string
): Promise<PostItem | void> => {
  const newPost = (await Post.addToDatabase(
    text,
    user_id,
    channel_id
  )) as PostItem;
  return newPost;
};

export const findAllPosts = async () => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM post
  ORDER BY created_at DESC;`)) as unknown as PostItem[];
};

export const findAllPostsByUser = async (user_id: string) => {
  return (await (
    await pool
  ).any(sql`SELECT * FROM post
  WHERE user_id = ${user_id};`)) as unknown as PostItem[];
};

export const findPostById = async (id: string): Promise<PostItem> => {
  return (await (
    await pool
  ).one(sql`
  SELECT p.id, text, u.username AS user, user_id, c.name AS channel_name, channel_id, p.created_at, p.updated_at FROM post AS p
  JOIN channel AS c ON channel_id = c.id
  JOIN user AS u ON user_id = u.id
  WHERE p.id = ${id};`)) as unknown as PostItem;
};

export const findAllPostsByChannel = async (
  channel_id: string
): Promise<NestedPostItem[]> => {
  return (await (
    await pool
  )
    .any(sql`SELECT p.id as post_id, text, u.username AS user, user_id, p.created_at, p.updated_at FROM post AS p
  JOIN user AS u ON user_id = u.id
  WHERE channel_id = ${channel_id}
  ORDER BY created_at ASC;`)) as unknown as NestedPostItem[];
};

export default Post;
