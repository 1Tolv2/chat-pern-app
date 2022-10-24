import React, { useState, useContext } from "react";
import ServerList from "./ServerList";
import ChannelList from "./ChannelList";
import { ChannelItem, ServerItem } from "@chat-app-typescript/shared";
import ChannelContent from "./ChannelContent";
import { UserContext } from "../Layout";
import ChannelSidebar from "./ChannelSidebar";

type Props = {};

const MainContent = (props: Props) => {
  const [activeChannel, setActiveChannel] = useState<ChannelItem | null>(null);
  const [activeServer, setActiveServer] = useState<ServerItem | null>(null);
  const { user } = useContext(UserContext);

  return (
    user && (
      <>
        <ServerList user={user} states={{ activeServer, setActiveServer }} />
        <ChannelSidebar user={user}
          states={{ activeChannel, setActiveChannel, activeServer }}
        />
        <ChannelContent activeChannel={activeChannel} />
      </>
    )
  );
};

export default MainContent;
