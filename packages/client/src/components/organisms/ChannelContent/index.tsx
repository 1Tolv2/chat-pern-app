import { ChannelItem } from "@chat-app-typescript/shared";
import React from "react";
import MemberSidebar from "../MemberSidebar";
import MessageBoard from "../MessageBoard";
import UserModal from "../UserModal";
import * as s from "./styles";

type Props = {
  activeChannel: ChannelItem | null;
};

const ChannelContent = ( {activeChannel}: Props) => {
  console.log("ChannelContent", activeChannel);
  return (
    <s.Container>
      <UserModal />
      {activeChannel && <MessageBoard activeChannel={activeChannel}/>}
      {/* <MemberSidebar /> */}
    </s.Container>
  );
};

export default ChannelContent;
