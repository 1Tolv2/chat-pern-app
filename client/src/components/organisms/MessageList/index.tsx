import React from "react";
import MessageItem from "../../molecules/MessageItem";
import { Message } from "../../../global/types";
import * as s from "./styles";

type Props = {};

const messageList: Message[] = [
  { id: 1, username: "tolv", text: "Hello World", timeStamp: new Date() },
  { id: 2, username: "test", text: "Hello World2", timeStamp: new Date() },
];

const MessageList = (props: Props) => {
  return (
    <s.MessageList>
      {messageList.map((message: Message, index) => {
        return (
          <MessageItem key={index} data={message}/>
        );
      })}
    </s.MessageList>
  );
};

export default MessageList;
