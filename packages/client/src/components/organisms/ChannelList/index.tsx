import { ChannelItem, ServerItem, UserItem } from "@chat-app-typescript/shared";
import React, { useEffect, useReducer } from "react";
import { getServer } from "../../../global/api";
import AdminChannelModal from "../../molecules/AdminChannelModal";
import * as s from "./styles";

type Props = {
  states: {
    activeServer: ServerItem | null;
    activeChannel: ChannelItem | null;
    setActiveChannel: React.Dispatch<React.SetStateAction<ChannelItem | null>>;
  };
  isAdmin: boolean;
};

type ChannelAction = {
  type: "add" | "remove" | "replace";
  input: ChannelItem | ChannelItem[];
};
const channelReducer = (state: ChannelItem[], action: ChannelAction) => {
  if (!action.input) {
    return state;
  } else {
    switch (action.type) {
      case "add":
        return [...state, action.input as ChannelItem];
      case "remove":
        return state.filter(
          (channel) => channel.id !== (action.input as ChannelItem).id
        );
      case "replace": {
        return action.input as ChannelItem[];
      }
    }
  }
};

const ChannelList = ({ states, isAdmin }: Props) => {
  const [channels, dispatch] = useReducer(channelReducer, []);
  const { activeServer, setActiveChannel } = states;

  const fetchServerChannels = async (): Promise<ServerItem> => {
    const res = await getServer(activeServer?.id || 1);
    dispatch({ type: "replace", input: res.channels || [] });
    return res;
  };

  useEffect(() => {
    if (activeServer) {
      fetchServerChannels().then((server) => {
        const channel = server?.channels?.[0] || null;
        setActiveChannel(channel as unknown as ChannelItem);
      });
    }
  }, [activeServer, dispatch]);


  const handleOnClick = async (e: any): Promise<void> => {
    const server = await fetchServerChannels();
    const channel =
      server?.channels?.find(
        (item: ChannelItem) => item.id === parseInt((e.target as HTMLLIElement).id)
      ) || null;
    states.setActiveChannel(channel as unknown as ChannelItem);
  };

  return (
    <s.Container>
      <AdminChannelModal isAdmin={isAdmin} serverId={activeServer?.id || 0} setState={states.setActiveChannel} modifyChannelList={dispatch}/>
      <s.StyledChanneList>
        {channels.map((channel) => {
          return (
            <s.StyledChannelItem
              key={channel.id}
              id={`${channel.id}`}
              onClick={handleOnClick}
              className={channel.id === states.activeChannel?.id ? "active" : ""}
            >
              <img src="/tag.svg" alt="hashtag icon"/> {channel.name}
            </s.StyledChannelItem>
          );
        })}
      </s.StyledChanneList>
    </s.Container>
  );
};

export default ChannelList;
