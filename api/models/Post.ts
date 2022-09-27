import crypto from "crypto";
import { TimeStamps } from "../global/types";

/* post TABLE
 * id INT SERIAL PRIMARY KEY,
 * text VARCHAR NOT NULL,
 * channel_id SERIAL NOT NULL
 * FOREGIN KEY (channel_id) REFERENCES channel (id)
 * user_id SERIAL NOT NULL
 * FOREGIN KEY (user_id) REFERENCES user (id)
 * created_at TIMESTAMP NOT NULL 
 * updated_at TIMESTAMP
 */

interface PostAttributes {
  id: string;
  text: string;
  user_id: string;
  channel_id: string;
}

class Post implements PostAttributes, TimeStamps {
  id: string;
  text: string;
  user_id: string;
  channel_id: string;
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _text: string,
    _user_id: string,
    _channel_id: string,
  ) {
    this.id = crypto.randomUUID();
    this.text = _text;
    this.user_id = _user_id;
    this.channel_id = _channel_id;
    this.created_at = new Date();
    this.updated_at = null;
  }
}

export const createPost = async () => {}
export const findAllPosts = async () => {}
export const findPostById = async () => {} // with user and channel
export const updatePost = async () => {}
export const deletePost = async () => {}

export default Post;
