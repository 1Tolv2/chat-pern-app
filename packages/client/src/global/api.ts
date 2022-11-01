import { ChannelItem, ServerItem, UserItem } from "@chat-app-typescript/shared";
import axios from "axios";
import { ActivityData } from "./types";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8800";
axios.defaults.withCredentials = true;
// axios.interceptors.request.use((config) => {
//   if (!config?.headers) {
//     config.headers = {};
//   }
// const jwt = localStorage.getItem("jwt_token");
// if (jwt) {
//   config.headers["authorization"] = `Bearer ${jwt}`;
// }
//   return config;
// });

export const registerUser = async (
  email: string,
  username: string,
  password: string
): Promise<number> => {
  const res = await axios.post("/users", { email, username, password });
  return res.status;
};

type LoginResponse = {
  user: Partial<UserItem>;
  token: string;
};
export const loginUser = async (
  username: string,
  password: string
): Promise<UserItem | null> => {
  const loginResponse = await axios.post<LoginResponse>("/users/auth", {
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
  channelId: string
): Promise<ChannelItem> => {
  const res = await axios.get<ChannelItem>(`/channels/${channelId}`);
  return res.data;
};

export const getServers = async (): Promise<ServerItem[]> => {
  const res = await axios.get<ServerItem[]>("/servers");
  return res.data;
};

export const getServerUsers = async (
  serverId: string
): Promise<ActivityData> => {
  const res = await axios.get<ActivityData>(`/servers/${serverId}`);
  return { title: "online", users: res.data.users };
};

export const getServer = async (serverId: string): Promise<ServerItem> => {
  const res = await axios.get<ServerItem>(`/servers/${serverId}`);
  return res.data;
};

export const createChannel = async (name: string, serverId: string) => {
  const res = await axios.post("/channels", { name, serverId });
  return res;
};

export const createPost = async (message: string, channelId: string) => {
  const res = await axios.post("/posts", { text: message, channelId });
  return res;
};

export const getUser = async () => {
  const res = await axios.get<UserItem>("/users/me");
  return res;
};

export const addMemberToServer = async (serverId: string, userId: string) => {
  return axios.post(`/servers/${serverId}/member`, { user_id: userId });
};
