import { ChannelItem } from "@chat-app-typescript/shared";

export type Post = {
  id: number;
  user: string;
  body: string;
  created_at: Date;
  updated_at: Date;
};

export type Member = {
  id: string;
  channel_id: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  channel_name: string;
  user: string;
};

export type ActivityData = {
  title: string;
  users: Member[];
};

export type ChannelAction = {
  type: "add" | "remove" | "replace";
  input: ChannelItem | ChannelItem[];
};
