import React from "react";
import MessageItem from "./MessageItem";
import { PostItem } from "@chat-app-typescript/shared";

type Props = {
  data: PostItem[];
};

const MessageList = ({ data }: Props) => {

  return (
    <ul>
      {data?.map((post: PostItem, index) => {
        return <MessageItem key={index} data={post} />;
      })}
    </ul>
  );
};

export default MessageList;
