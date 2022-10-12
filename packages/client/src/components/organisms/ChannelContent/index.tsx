import React from "react";
import { ChannelItem } from "@chat-app-typescript/shared";
import Header from "../../Layout/Header";
import MemberSidebar from "../MemberSidebar";
import MessageBoard from "../MessageBoard";
import * as s from "./styles";

type Props = {
  activeChannel: ChannelItem | null;
};

const ChannelContent = ({ activeChannel }: Props) => {
  return (
    <div style={{ height: "100%" }}>
      <Header activeChannel={activeChannel} />
      <s.Container>
        <MessageBoard activeChannel={activeChannel} />
        {/* <MemberSidebar /> */}
      </s.Container>
    </div>
  );
};

export default ChannelContent;
