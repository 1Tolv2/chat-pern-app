import { ChannelItem } from "@chat-app-typescript/shared";
import React, { useState } from "react";
import { createPost } from "../../../global/api";
import Textarea from "../../atoms/Textarea";
import * as s from "./styles";

type Props = {
  activeChannel: ChannelItem | null;
};

const MessageCreator = ({activeChannel}: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createPost(message, activeChannel?.id || 1);
    console.log(res, message);
    setMessage("");
  };

  return (
    <s.Container>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Textarea
          id="Message"
          type="text"
          setValue={setMessage}
          value={message}
          placeholder="Message..."
        />
        <input type="submit" hidden />
      </form>
    </s.Container>
  );
};

export default MessageCreator;
