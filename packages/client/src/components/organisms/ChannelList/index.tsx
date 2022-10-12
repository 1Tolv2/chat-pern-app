import { ChannelItem, ServerItem } from "@chat-app-typescript/shared";
import React, { useEffect, useState } from "react";
import { getServer } from "../../../global/api";
import * as s from "./styles";

type Props = {
  states: {
    activeServer: ServerItem | null;
    activeChannel: ChannelItem | null;
    setActiveChannel: React.Dispatch<React.SetStateAction<ChannelItem | null>>;
  };
};

const ChannelList = ({ states }: Props) => {
  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  console.log(states.activeServer);

  const fetchServer = async (): Promise<ServerItem> => {
    const res = await getServer(states.activeServer?.id || 1)
    setChannelList(res.channels || []);
    return res;
  };
  const handleActiveChannel = async () => {
    const server = await fetchServer();
    const channel = server?.channels?.[0] || null;
    states.setActiveChannel(channel as unknown as ChannelItem);
  };

  useEffect(() => {
    handleActiveChannel();
  }, [states.activeServer]);

  const handleOnClick = async (e: any) => {
    const server = await fetchServer();
    const channel =
      server?.channels?.find(
        (item: any) => item.id === parseInt(e.target.id)
      ) || null;
    states.setActiveChannel(channel as unknown as ChannelItem);
  };

  return (
    <s.Container>
      <ul style={{minWidth: "64px"}}>
        {channelList.map((channel) => {
          return (
            <li key={channel.id} id={`${channel.id}`} onClick={handleOnClick}>
              * {channel.name}{" "}
            </li>
          );
        })}
      </ul>
    </s.Container>
  );
};

export default ChannelList;
