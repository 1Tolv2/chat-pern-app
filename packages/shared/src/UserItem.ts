import { PostItem } from "./PostItem";
export type ServerTrait = {
  serverName: string;
  role: "admin" | "user";
};

export interface UserItem {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  posts?: PostItem[];
  servers?: ServerTrait[];
}
