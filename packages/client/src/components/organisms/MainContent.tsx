import React, { useState, useContext } from "react";
import ServerList from "./ServerList";
import ChannelList from "./ChannelList";
import { ChannelItem, ServerItem } from "@chat-app-typescript/shared";
import ChannelContent from "./ChannelContent";
import { UserContext } from "../Layout";

type Props = {};

const MainContent = (props: Props) => {
  const [activeChannel, setActiveChannel] = useState<ChannelItem | null>(null);
  const [activeServer, setActiveServer] = useState<ServerItem | null>(null);
  const { user } = useContext(UserContext);
  console.log("USER", user?.servers)

  return (
    user && (
      <>
        <ServerList states={{ activeServer, setActiveServer }} />
        <ChannelList user={user}
          states={{ activeChannel, setActiveChannel, activeServer }}
        />
        <ChannelContent activeChannel={activeChannel} />
      </>
    )
  );
};

export default MainContent;
