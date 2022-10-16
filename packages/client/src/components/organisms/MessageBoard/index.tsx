import React from "react";
import MessageList from "../MessageList";
import MessageStart from "../../molecules/MessageStart";
import MessageCreator from "../../molecules/MessageCreator";
import * as s from "./styles";
import { ChannelItem } from "@chat-app-typescript/shared";

type Props = {
  activeChannel: ChannelItem | null;
};

const MessageBoard = ({ activeChannel }: Props) => {
  return (
    <s.Container>
      <s.Wrapper>
        <s.ScrollContainer>
          <MessageStart activeChannel={activeChannel} />
          <MessageList activeChannel={activeChannel} />
        </s.ScrollContainer>
      </s.Wrapper>
      <MessageCreator activeChannel={activeChannel} />
    </s.Container>
  );
};

export default MessageBoard;
