import { ChannelItem, ServerItem, UserItem } from "@chat-app-typescript/shared";
import axios from "axios";
import { ActivityData } from "./types";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8800";
axios.defaults.withCredentials = true;

export const registerUser = async (
  email: string,
  username: string,
  password: string
): Promise<number> => {
  const res = await axios.post("/users", { email, username, password });
  return res.status;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<Partial<UserItem> | null> => {
  const loginResponse = await axios.post<Partial<UserItem>>("/users/auth", {
    username,
    password,
  });

  if (loginResponse?.status === 200) {
    const res = await axios.get<UserItem>("/users/me");
    return res.data;
  }
  return null;
};

export const getAllUsers = async (): Promise<UserItem[]> => {
  const res = await axios.get<UserItem[]>("/users");
  return res.data;
};

export const getChannelPosts = async (
  channel_id: string
): Promise<ChannelItem> => {
  const res = await axios.get<ChannelItem>(`/channels/${channel_id}`);
  return res.data;
};

export const getServers = async (): Promise<ServerItem[]> => {
  const res = await axios.get<ServerItem[]>("/servers");
  return res.data;
};

export const getServer = async (server_id: string): Promise<ServerItem> => {
  const res = await axios.get<ServerItem>(`/servers/${server_id}`);
  return res.data;
};

export const createChannel = async (name: string, server_id: string) => {
  const res = await axios.post("/channels", {
    name,
    server_id,
    description: "",
  });
  return res;
};

export const createPost = async (message: string, channel_id: string) => {
  const res = await axios.post("/posts", { text: message, channel_id });
  return res;
};

export const getUser = async () => {
  const res = await axios.get<UserItem>("/users/me");
  return res;
};

export const addMemberToServer = async (server_id: string, user_id: string) => {
  return axios.post(`/servers/${server_id}/member`, { user_id });
};
