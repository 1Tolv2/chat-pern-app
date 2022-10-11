import { ChannelItem } from "./ChannelItem";

export interface ServerItem {
    id?: number;
    name: string;
    description: string;
    channels?: ChannelItem[];
    users?: number[];
  }