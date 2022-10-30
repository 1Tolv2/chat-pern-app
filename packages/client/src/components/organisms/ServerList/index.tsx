import { ServerItem, UserItem } from "@chat-app-typescript/shared";
import React, { useEffect, useState } from "react";
import { getServer, getServers } from "../../../global/api";
import Avatar from "../../atoms/Avatar";
import * as s from "./styles";

type Props = {
  states: {
    activeServer: ServerItem | null;
    setActiveServer: React.Dispatch<React.SetStateAction<ServerItem | null>>;
  };
  user: UserItem;
};

const ServerList = ({ states, user }: Props) => {
  const [serverList, setServerList] = useState<ServerItem[]>([]);

  const fetchServers = async (): Promise<void> => {

    const servers = (await getServers()).filter((server) => {
      return user?.servers?.find((userServer) => {
        return userServer.id === server.id
      })
    });
    setServerList(servers);
    states.setActiveServer(servers[0]);

  };
  useEffect(() => {
    if (user) {
      fetchServers();
    }
  }, [user]);

  const handleOnClick = async (e: any): Promise<void> => {
    if(parseInt(e.target.id.replace("channel_", "")) !== states?.activeServer?.id) {
    states.setActiveServer(await getServer(e.target.id.replace("channel_", "")));}
  };

  const formatName = (name: string): string => {
    const splitName = name.split(" ");
    let avatarName: string = "";
    for (let i = 0; i < 3; i++) {
      if (splitName[i]) {
        if (i === 0) {
          avatarName += splitName[i][0].toUpperCase();
        } else avatarName += splitName[i][0];
      }
    }
    return avatarName;
  };

  return (
    <s.Container>
      <s.StyledList>
        <s.ListItem>
          <Avatar id="channel_start" size="48px" bgColor="darkGrey" hover/>
          <hr />
        </s.ListItem>
        {serverList.map((server: ServerItem) => {
          return (
            <s.ListItem
              key={server?.id}
              id={server.id === states.activeServer?.id ? "active" : ""}
            >
              <s.Pill className="pill"/>
              <Avatar id={"channel_" + server?.id?.toString() || ""} text={formatName(server.name)} bgColor="darkGrey" size="48px" hover={true} onClick={handleOnClick}/>
            </s.ListItem>
          );
        })}
      </s.StyledList>
    </s.Container>
  );
};

export default ServerList;
