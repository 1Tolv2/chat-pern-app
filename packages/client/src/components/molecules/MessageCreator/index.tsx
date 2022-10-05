import React, { useState } from "react";
import Textarea from "../../atoms/Textarea";
import * as s from "./styles";

type Props = {};

const MessageCreator = (props: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // post message
    console.log(message);
    setMessage("");
  };

  return (
    <s.Container>
      <form onSubmit={handleSubmit} style={{width: "100%"}}>
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
