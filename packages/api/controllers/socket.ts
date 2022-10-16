// import { Request, Response, NextFunction } from "express";
// import { UserItem } from "@chat-app-typescript/shared";
// import User from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";
// import dotenv from "dotenv";
// import { requiredFieldsCheck } from ".";
import { PostItem } from "@chat-app-typescript/shared";
import { io } from "../app";
import { findAllPostsByChannel } from "../models/Post";

const posts: PostItem[] = [
  { text: "Hello World!", user_id: 1, channel_id: 1 },
  { text: "Hello World! 2", user_id: 1, channel_id: 1 },
];

export const runSocketServer = async(socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  console.log("TOKEN", token);
  if (token) {
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      console.log("USER", user);
    } catch (error: any) {
      console.error("ERROR", error);
    }
    if (user) {
      console.log("A client connected to server");
      const posts = await findAllPostsByChannel(socket.handshake.query.channel_id)
      socket.emit("messages", posts); // skicka meddelande när de kopplar upp sig

      socket.on("message", (message: any) => {
        console.log("Message: ", message.text);
        // save posts
        posts.push(message);
        io.emit("message", message); // skicka meddelande när nytt dykt upp
      });

      socket.on("disconnect", (reason: any) => {
        console.log(reason);
        console.log("A client disconnected from server");
      });
    }
  }
  next();
};
