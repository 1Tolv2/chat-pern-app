import { ChannelItem } from "./ChannelItem";

export interface ServerItem {
  id?: number;
  name: string;
  description: string;
  role?: "admin" | "member";
  channels?: ChannelItem[];
  users?: number[];
  user_id?: number;
}
