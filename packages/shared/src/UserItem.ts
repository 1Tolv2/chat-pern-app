import { PostItem } from "./PostItem";
import { ServerItem } from "./ServerItem";

export interface UserItem {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  posts?: PostItem[];
  servers?: ServerItem[];
}
