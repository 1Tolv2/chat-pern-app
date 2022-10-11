import { PostItem } from "./PostItem";
export type ServerTrait = {
  user_id: number;
  role: "admin" | "user";
  server_id: number;
  server_name: string;
  server_description: string;
};

export interface UserItem {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  posts?: PostItem[];
  servers?: ServerTrait[];
}
