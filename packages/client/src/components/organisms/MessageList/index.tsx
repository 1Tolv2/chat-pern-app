import React, { useEffect, useContext, useState, useReducer } from "react";
import { getChannelPosts } from "../../../global/api";
import MessageItem from "../../molecules/MessageItem";
import * as s from "./styles";
import { ModalContext } from "../../Layout";
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

const MessageList = ({ activeChannel, socket, setSocket }: Props) => {
  const { modalVisible } = useContext(ModalContext);
  const [posts, dispatch] = useReducer(postReducer, []);

  const fetchData = async () => {
    if (!modalVisible) {
      try {
        const data = await getChannelPosts(activeChannel?.id || 1);
        dispatch({ type: "replace", input: data?.posts || [] });
      } catch (err) {
        if (err instanceof Error) {
          console.error("ERROR", err);
        }
      }
    }
  };

  // useEffect(() => {
  // console.log("fetching posts")
  //   fetchData();
  // }, [activeChannel]);

  useEffect(() => {
    console.log("I RUN!");
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
        console.log("HERE a", message);
        dispatch({ type: "add", input: message });
      });
      socket.on("messages", (messages) => {
        console.log("HERE b", messages);
        dispatch({ type: "replace", input: messages });
      });
      return () => {
        socket.off("message");
        socket.off("messages");
        socket.disconnect();
      };
    }
  }, []);

  return (
    <s.MessageList>
      {posts?.map((post: PostItem, index) => {
        return <MessageItem key={index} data={post} />;
      })}
    </s.MessageList>
  );
};

export default MessageList;
