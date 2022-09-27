import { TimeStamps } from "../global/types";

/* server TABLE
 * id INT SERIAL PRIMARY KEY,
 * name VARCHAR(60) NOT NULL UNIQUE,
 * description VARCHAR,
 * created_at TIMESTAMP,
 * updated_at TIMESTAMP
 */

interface ServerAttributes {
    id: string;
    name: string;
    description: string;
    channels: string[]; // channel_ids
    users: string[]; // user_ids
  }
  
  class Server implements ServerAttributes, TimeStamps {
    id: string;
    name: string;
    description: string;
    channels: string[]; // channel_ids
    users: string[]; // user_ids
    created_at: Date;
    updated_at: Date | null;
  
    constructor(
      _name: string,
      _description: string,
      _password: string,
      _channels: string[],
      _users: string[]
    ) {
      this.id = crypto.randomUUID();
      this.name = _name;
      this.description = _description;
      this.channels = _channels || [];
      this.users = _users || [];
      this.created_at = new Date();
      this.updated_at = null;
    }
  }
  
  export const createServer = async () => {}
  export const findAllServers = async () => {}
  export const findServerById = async () => {} // with channels and users
  export const updateServer = async () => {}
  export const deleteServer = async () => {}

  export default Server