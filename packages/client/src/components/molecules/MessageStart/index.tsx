import { ChannelItem } from "@chat-app-typescript/shared";
import React from "react";
import Paragraph from "../../atoms/Paragraph";
import * as s from "./styles";

type Props = {activeChannel: ChannelItem | null};

const MessageStart = ({activeChannel}: Props) => {
  console.log(activeChannel)
  return (
    <s.Container>
      <s.Header>{`Welcome to #${activeChannel?.name || ""}`}</s.Header>
      <Paragraph color="lighterGrey">{`This is the start of the #${activeChannel?.name || ""} channel.`}</Paragraph>
    </s.Container>
  );
};

export default MessageStart;
