import { ServerItem } from "@chat-app-typescript/shared";
import React, { useEffect, useState } from "react";
import { getServer, getServers } from "../../../global/api";
import * as s from "./styles";

type Props = {
  states: {
    activeServer: ServerItem | null;
    setActiveServer: React.Dispatch<React.SetStateAction<ServerItem | null>>;
  };
};

const ServerList = ({ states }: Props) => {
  const [serverList, setServerList] = useState<ServerItem[]>([]);

  const fetchServers = async (): Promise<void> => {
    const servers = await getServers();
    setServerList(servers)
    console.log("SERVERS", servers)
    states.setActiveServer(servers[0])
  }
  useEffect(() => {
    fetchServers()
  }, []);

  const handleOnClick = async (e: any) => {
    states.setActiveServer(await getServer(e.target.id));
  };

  return (
    <s.Container>
      <ul>
        {serverList.map((server: ServerItem) => {
          return (
            <li
              key={server?.id}
              id={server?.id?.toString() || ""}
              onClick={handleOnClick}
              style={{ color: "white" }}
            >
              {server.name}
            </li>
          );
        })}
      </ul>
    </s.Container>
  );
};

export default ServerList;
