import { PostItem } from "./PostItem";
import { ServerTrait } from "./";

export interface UserItem {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  posts?: PostItem[];
  servers?: ServerTrait[];
}
