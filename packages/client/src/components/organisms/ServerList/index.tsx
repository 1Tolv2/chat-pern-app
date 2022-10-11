import { ServerItem } from "@chat-app-typescript/shared";
import { ServerTrait } from "@chat-app-typescript/shared/src/UserItem";
import React, { useEffect, useState, useContext, ReactEventHandler } from "react";
import { UserContext } from "../../Layout";
import * as s from "./styles";

type Props = {
  // states: {
  //   activeServer: ServerItem;
  //   setActiveServer: React.Dispatch<React.SetStateAction<ServerItem>>;
  // }
};

const ServerList = (props: Props) => {
  const [serverList, setServerList] = useState<ServerTrait[]>([]);
  const {user} = useContext(UserContext);

  useEffect(()=> {
    console.log("ServerList",user)
    if (user) {
        setServerList(user.servers || []);
    }
  }, [])

  const handleOnClick = (e: any) => {
    console.log("CLICKED", e.target);
  }

  return <s.Container><ul>
    {serverList.map((server, index) => {
        return <li key={index} onClick={handleOnClick}>* {server.server_name}  </li>
    })}
    </ul></s.Container>;
};

export default ServerList;
