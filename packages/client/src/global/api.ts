import { ChannelItem, ServerItem, UserItem } from "@chat-app-typescript/shared";
import axios, { AxiosResponse } from "axios";
import { Post, ActivityData } from "./types";

axios.defaults.baseURL = "http://localhost:8800";
axios.interceptors.request.use((config) => {
  if (!config?.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt_token");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

export const loginUser = async (
  username: string,
  password: string
): Promise<AxiosResponse> => {
  const res = await axios.post("/users/auth", {
    username,
    password,
  });
  if (res.data.token) localStorage.setItem("jwt_token", res.data.token);

  return res;
};

export const getAllUsers = async () => {
  const res = await axios.get("/users");
  return res;
};

export const getChannelPosts = async (
  channelId: number
): Promise<ChannelItem> => {
  const res = await axios.get<ChannelItem>(`/channels/${channelId}`);
  return res.data;
};

export const getServers = async (): Promise<ServerItem[]> => {
  const res = await axios.get("/servers");
  return res.data;
};

export const getServerUsers = async (
  serverId: string
): Promise<ActivityData> => {
  const res = await axios.get<ActivityData>(`/servers/${serverId}`);
  return { title: "online", users: res.data.users };
};

export const getServer = async (serverId: number): Promise<ServerItem> => {
  const res = await axios.get(`/servers/${serverId}`);
  return res.data;
};

export const createPost = async (message: string, channel_id: number) => {
  const res = await axios.post("/posts", { text: message, channel_id });
  return res;
};

export const getUser = async () => {
  const res = await axios.get("/users/me");
  return res;
};
