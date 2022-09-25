import React from "react";
import Textarea from "../../atoms/Textarea";
import MessageList from "../MessageList";
import * as s from "./styles";
import MessageStart from "../../molecules/MessageStart";

type Props = {};

const MessageBoard = (props: Props) => {
  return (
    <s.Container>
          <MessageStart />
          <MessageList />
          <Textarea />
    </s.Container>
  );
};

export default MessageBoard;
