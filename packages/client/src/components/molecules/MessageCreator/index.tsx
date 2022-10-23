import { ChannelItem } from "@chat-app-typescript/shared";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
// import { createPost } from "../../../global/api";
import Textarea from "../../atoms/Textarea";
import * as s from "./styles";

type Props = {
  activeChannel: ChannelItem | null;
  socket?: Socket;
  setSocket?: React.Dispatch<React.SetStateAction<Socket | undefined>>;
};

const MessageCreator = ({ activeChannel, socket, setSocket }: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket?.emit("message", {text: message, channel_id: activeChannel?.id || 1});
    // const res = await createPost(message, activeChannel?.id || 1);
    setMessage("");
  };

  return (
    <s.Container>
      <form onSubmit={message ? handleSubmit : () => {}} style={{ width: "100%" }}>
        <Textarea
          id="Message"
          type="text"
          setValue={setMessage}
          value={message}
          placeholder="Message..."
        />
        <input type="submit" hidden title="submit"/>
      </form>
    </s.Container>
  );
};

export default MessageCreator;
