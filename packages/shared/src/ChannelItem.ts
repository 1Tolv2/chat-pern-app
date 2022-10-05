import { PostItem } from "./PostItem";

export interface ChannelItem {
    id?: number;
    name: string;
    description: string;
    posts?: PostItem[];
    server_id: number;
  }