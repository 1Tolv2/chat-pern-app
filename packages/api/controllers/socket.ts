import { JwtPayload } from "jsonwebtoken";
import { PostItem } from "@chat-app-typescript/shared";
import { io } from "../app";
import { createPost, findAllPostsByChannel } from "../models/Post";
import { verifyToken } from "./auth";
import { Socket } from "socket.io";
import cookie from "cookie";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (a: PostItem) => void;
  messages: (a: PostItem[]) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export interface SocketServer
  extends ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData {}

export const runSocketServer = async (
  socket: Socket,
  next: () => void
): Promise<void> => {
  const JwtCookie = cookie.parse(socket.handshake.headers.cookie || "");
  if (JwtCookie) {
    let user: JwtPayload | null = null;
    try {
      user = verifyToken(JwtCookie.jwt);
    } catch (err) {
      if (err instanceof Error) {
        console.error("ERROR", err);
      }
    }
    if (user) {
      console.info("A client connected to server");
      const posts = await findAllPostsByChannel(
        (socket.handshake.query?.channel_id as string) || ""
      );
      socket.emit("messages", posts);

      socket.on("message", async (message: PostItem): Promise<void> => {
        const { text, channel_id } = message;
        const newPost = await createPost({
          text,
          username: user?.username,
          user_id: user?.user_id,
          channel_id,
        });
        io.emit("message", {
          ...newPost,
          user: user?.username,
        } as PostItem);
      });

      socket.on("disconnect", (reason: string) => {
        console.info("A client disconnected from the server due to: " + reason);
      });
    }
  }
  next();
};
