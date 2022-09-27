import crypto from "crypto";
import { TimeStamps } from "../global/types";

/* channel TABLE
 * id INT SERIAL PRIMARY KEY,
 * name VARCHAR(60) NOT NULL UNIQUE,
 * description VARCHAR 
 * server_id SERIAL NOT NULL
 * FOREGIN KEY (server_id) REFERENCES server(id)
 * created_at TIMESTAMP NOT NULL 
 * updated_at TIMESTAMP
 */

interface ChannelAttributes {
  id: string;
  name: string;
  description: string;
  posts: string[]; // post_ids
}

class Channel implements ChannelAttributes, TimeStamps {
  id: string;
  name: string;
  description: string;
  posts: string[];
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _name: string,
    _description: string,
    _password: string,
    _posts?: string[]
  ) {
    this.id = crypto.randomUUID();
    this.name = _name;
    this.description = _description;
    this.posts = _posts || [];
    this.created_at = new Date();
    this.updated_at = null;
  }
}

export const createChannel = async () => {}
export const findAllChannels = async () => {}
export const findChannelById = async () => {} // with posts with users
export const updateChannel = async () => {}
export const deleteChannel = async () => {}


export default Channel;
