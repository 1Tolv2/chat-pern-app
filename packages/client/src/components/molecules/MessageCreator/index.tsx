import { ChannelItem } from "@chat-app-typescript/shared";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import Textarea from "../../atoms/Textarea";
import * as s from "./styles";

type Props = {
  activeChannel: ChannelItem | null;
  socket?: Socket;
};

const MessageCreator = ({ activeChannel, socket }: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("message", message);
    if (message) {
      socket?.emit("message", {
        text: message,
        channel_id: activeChannel?.id || "",
      });
      setMessage("");
    }
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
        <input type="submit" hidden title="submit" />
      </form>
    </s.Container>
  );
};

export default MessageCreator;
