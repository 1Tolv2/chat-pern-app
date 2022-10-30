import { ChannelItem } from "./ChannelItem";

export interface ServerItem {
  id?: number;
  name: string;
  description: string;
  role?: "admin" | "member";
  channels?: ChannelItem[];
  users?: number[];
  user_id?: number;
  created_at?: Date;
  updated_at?: Date | null;
}
