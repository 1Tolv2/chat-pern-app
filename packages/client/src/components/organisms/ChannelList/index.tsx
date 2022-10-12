import { ChannelItem, ServerItem, UserItem } from "@chat-app-typescript/shared";
import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { createChannel, getServer } from "../../../global/api";
import Paragraph from "../../atoms/Paragraph";
import * as s from "./styles";

type Props = {
  states: {
    activeServer: ServerItem | null;
    activeChannel: ChannelItem | null;
    setActiveChannel: React.Dispatch<React.SetStateAction<ChannelItem | null>>;
  };
  user: UserItem
};

const ChannelList = ({ states, user}: Props) => {
  const [channelList, setChannelList] = useState<ChannelItem[]>([]);
  const [ channelName, setChannelName ] = useState<string>('');
  const [ channelDescription, setChannelDescription ] = useState<string>('');
const { activeServer, activeChannel, setActiveChannel } = states;

  const fetchServer = async (): Promise<ServerItem> => {
    const res = await getServer(activeServer?.id || 1)
    setChannelList(res.channels || []);
    return res;
  };
  const handleActiveChannel = async () => {
    const server = await fetchServer();
    const channel = server?.channels?.[0] || null;
    setActiveChannel(channel as unknown as ChannelItem);
  };

  useEffect(() => {
    handleActiveChannel();
  }, [activeServer]);

  const handleOnClick = async (e: any) => {
    const server = await fetchServer();
    const channel =
      server?.channels?.find(
        (item: any) => item.id === parseInt(e.target.id)
      ) || null;
    states.setActiveChannel(channel as unknown as ChannelItem);
  };

  const addChannel = async () => {
    console.log("CLICKED")
    // const res = await createChannel(channelName, channelDescription, states.activeServer?.id || 1);
    // res === 201 && handleActiveChannel()
  }
console.log("ACTIVE",activeChannel, activeServer)
  return (
    <s.Container>
      <div style={{display: "flex"}}>
      <Paragraph>Text Channels</Paragraph>
      {
        user.servers?.map((server) => {
          if (activeServer?.name === server.name && server?.role === "admin") {
            return <span onClick={addChannel}>+</span>
          }
        })
      }
      </div>
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
