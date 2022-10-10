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

export type Channel = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  posts: Post[];
};
interface OkResponse extends AxiosResponse {
  token: string;
}

export const loginUser = async (
  username: string,
  password: string
): Promise<number> => {
  const res: OkResponse = await axios.post("/users/auth", { username, password });
  if (res.data.token) localStorage.setItem("jwt_token", res.data.token);
  
  return res.status;
};

export const getAllUsers = async () => {
  const res = await axios.get("/users");
  return res;
};

export const getChannelPosts = async (channelId: string): Promise<Channel> => {
  const res = await axios.get<Channel>(`/channels/${channelId}`);
  return res.data;
};

export const getServerUsers = async (
  serverId: string
): Promise<ActivityData> => {
  const res = await axios.get<ActivityData>(`/servers/${serverId}`);
  return { title: "online", users: res.data.users };
};
