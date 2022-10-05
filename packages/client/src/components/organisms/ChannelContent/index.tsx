import React from "react";
import MemberSidebar from "../MemberSidebar";
import MessageBoard from "../MessageBoard";
import * as s from "./styles";

type Props = {};

const ChannelContent = (props: Props) => {
  return (
    <s.Container>
      <MessageBoard />
      <MemberSidebar />
    </s.Container>
  );
};

export default ChannelContent;
