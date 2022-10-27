import React, { useState } from "react";
import MessageStart from "../../molecules/MessageStart";
import MessageCreator from "../../molecules/MessageCreator";
import * as s from "./styles";
import { ChannelItem } from "@chat-app-typescript/shared";
import { Socket } from "socket.io-client";
import RenderMessageFeed from "../../molecules/RenderMessageFeed";


type Props = {
  activeChannel: ChannelItem | null;
};

const MessageBoard = ({ activeChannel }: Props) => {
  const [socket, setSocket] = useState<Socket>();

  return (
    <s.Container>
      <s.Wrapper>
        <s.ScrollContainer>
          <MessageStart activeChannel={activeChannel}  />
          <RenderMessageFeed activeChannel={activeChannel} socket={socket} setSocket={setSocket}/>
        </s.ScrollContainer>
      </s.Wrapper>
      <MessageCreator activeChannel={activeChannel} socket={socket} setSocket={setSocket}/>
    </s.Container>
  );
};

export default MessageBoard;
