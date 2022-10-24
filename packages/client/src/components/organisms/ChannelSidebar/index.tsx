import { ChannelItem, ServerItem, UserItem } from '@chat-app-typescript/shared';
import React from 'react'
import UserArea from '../../molecules/UserArea';
import ChannelList from '../ChannelList'
import * as s from './styles'

type Props = {
    states: {
      activeServer: ServerItem | null;
      activeChannel: ChannelItem | null;
      setActiveChannel: React.Dispatch<React.SetStateAction<ChannelItem | null>>;
    };
    user: UserItem;
  };

const ChannelSidebar = ({states, user}: Props) => {
    const {activeServer, activeChannel, setActiveChannel} = states;

const isServerAdmin = () => {
    return user.servers?.find((server) => server.name === activeServer?.name)?.role === "admin";
}
  return (
    <s.Container>
        <s.Header>
        <h3>{activeServer?.name}</h3>
      </s.Header>
        <ChannelList isAdmin={isServerAdmin()}
          states={{ activeChannel, setActiveChannel, activeServer }}/>
          <UserArea user={user}/>
    </s.Container>
  )
}

export default ChannelSidebar