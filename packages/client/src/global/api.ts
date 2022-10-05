import axios from "axios";
import { Post, ActivityData, Member } from "./types";

axios.defaults.baseURL = "http://localhost:8800";

export type Channel = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  posts: Post[];
};


export const getAllUsers = async () => {
  const res = await axios.get("/users");
  return res;
};

export const getChannelPosts = async (channelId: string): Promise<Channel> => {
  const res = await axios.get<Channel>(`/channels/${channelId}/posts`);
  return res.data;
};

export const getChannelUsers = async (channelId: string): Promise<ActivityData> => {
  const res = await axios.get<ActivityData>(`/channels/${channelId}/users`);
  return {title: "online", users: res.data.users}
}
