import React from "react";
import Paragraph from "../../atoms/Paragraph";
import * as s from "./styles";
import logo from "../../../logo.svg";

type Props = {};

type Message = {
  id: number;
  username: string;
  text: string;
  timeStamp: Date;
};
const messageList: Message[] = [
  { id: 1, username: "tolv", text: "Hello World", timeStamp: new Date() },
  { id: 2, username: "test", text: "Hello World2", timeStamp: new Date() },
];

const MessageList = (props: Props) => {

  const firstLetterToUppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <s.MessageList>
      {messageList.map((message: Message) => {
        return (
          <s.MessageItem>
            <s.MessageWrapper>
              <s.ProfileImage src={logo}/>
              <div>
                <s.Heading>{firstLetterToUppercase(message.username)}</s.Heading>
              <Paragraph>{message.text}</Paragraph>
              </div>
            </s.MessageWrapper>
          </s.MessageItem>
        );
      })}
    </s.MessageList>
  );
};

export default MessageList;
