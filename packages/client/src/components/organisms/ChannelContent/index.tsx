import React from "react";
import MemberSidebar from "../MemberSidebar";
import MessageBoard from "../MessageBoard";
import UserModal from "../UserModal";
import * as s from "./styles";

type Props = {};

const ChannelContent = (props: Props) => {
  return (
    <s.Container>
      <UserModal />
      <MessageBoard />
      <MemberSidebar />
    </s.Container>
  );
};

export default ChannelContent;
