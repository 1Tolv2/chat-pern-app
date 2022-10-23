import React, { useEffect, useReducer } from "react";
import MessageItem from "../../molecules/MessageItem";
import * as s from "./styles";
import { ChannelItem, PostItem } from "@chat-app-typescript/shared";
import { io, Socket } from "socket.io-client";

type Props = {
  activeChannel: ChannelItem | null;
  socket?: Socket;
  setSocket?: React.Dispatch<React.SetStateAction<Socket | undefined>>;
};

type PostAction = {
  type: "add" | "remove" | "replace";
  input: PostItem | PostItem[];
};
const postReducer = (state: PostItem[], action: PostAction) => {
  if (!action.input) {
    return state;
  } else {
    switch (action.type) {
      case "add":
        return [...state, action.input as PostItem];
      case "remove":
        return state.filter(
          (post) => post.id !== (action.input as PostItem).id
        );
      case "replace":
        return action.input as PostItem[];
    }
  }
};

const MessageList = ({ activeChannel, setSocket }: Props) => {
  const [posts, dispatch] = useReducer(postReducer, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (activeChannel && token) {
      const socket = io("http://localhost:8800", {
        auth: {
          token,
        },
        query: { channel_id: activeChannel?.id },
        autoConnect: false,
      });

      socket.connect();
      setSocket && setSocket(socket);
      socket.on("message", (message) => {
        dispatch({ type: "add", input: message });
      });
      socket.on("messages", (messages) => {
        dispatch({ type: "replace", input: messages });
      });
      return () => {
        socket.off("message");
        socket.off("messages");
        socket.disconnect();
      };
    }
  }, [activeChannel]);

  return (
    <s.MessageList>
      {posts?.map((post: PostItem, index) => {
        return <MessageItem key={index} data={post} />;
      })}
    </s.MessageList>
  );
};

export default MessageList;
