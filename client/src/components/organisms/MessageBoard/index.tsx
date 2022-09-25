import React from "react";
import MemberSidebar from "../MemberSidebar";
import Textarea from "../../atoms/Textarea";
import MessageList from "../MessageList";
import * as s from "./styles";
import MessageStart from "../../molecules/MessageStart";

type Props = {};

const MessageBoard = (props: Props) => {
  return (
    <s.Container>
      <s.ChannelContainer>
        <s.MessageBoardWrapper>
          <MessageStart />
          <MessageList />
          <Textarea />
        </s.MessageBoardWrapper>
        <MemberSidebar />
      </s.ChannelContainer>
    </s.Container>
  );
};

export default MessageBoard;
