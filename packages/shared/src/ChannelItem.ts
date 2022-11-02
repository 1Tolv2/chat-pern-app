import { PostItem } from "./PostItem";

export interface ChannelItem {
  id: string;
  name: string;
  description: string;
  posts?: PostItem[];
  server_id?: string;
  server_name?: string;
  created_at: Date;
  updated_at: Date | null;
}
