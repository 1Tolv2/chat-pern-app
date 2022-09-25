import React from "react";
import Paragraph from "../../atoms/Paragraph";
import * as s from "./styles";

type Props = {};

const MessageStart = (props: Props) => {
  return (
    <s.Container>
      <s.Header>Welcome to #general</s.Header>
      <Paragraph color="lighterGrey">This is the start of the #general channel.</Paragraph>
    </s.Container>
  );
};

export default MessageStart;
