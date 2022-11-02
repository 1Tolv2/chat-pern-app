import { ChannelItem, PostItem } from "@chat-app-typescript/shared";
import React, { useEffect, useReducer } from "react";
import { io, Socket } from "socket.io-client";
import MessageList from "./MessageList";

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

const RenderMessageFeed = ({ activeChannel, setSocket }: Props) => {
  const [posts, dispatch] = useReducer(postReducer, []);

  const socketListeners = (socket: Socket) => {
    socket.on("online", (onlineUsers: { user: string; user_id: string }) => {
      console.log(onlineUsers);
    });
    socket.on("message", (message: PostItem) => {
      if (message.channel_id === activeChannel?.id) {
        dispatch({ type: "add", input: message });
      }
    });
    socket.on("messages", (messages: PostItem[]) => {
      dispatch({ type: "replace", input: messages });
    });
  };

  const handleSocketConnection = (token: string) => {
    const socket = io(
      process.env.REACT_APP_API_URL || "http://localhost:8800",
      {
        auth: {
          token,
        },
        query: { channel_id: activeChannel?.id },
        autoConnect: false,
      }
    );
    socket.connect();
    setSocket && setSocket(socket);
    socketListeners(socket);
    return () => {
      socket.off("message");
      socket.off("messages");
      socket.disconnect();
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (activeChannel && token) {
      return handleSocketConnection(token);
    }
  }, [activeChannel]);

  return <MessageList data={posts} />;
};

export default RenderMessageFeed;
