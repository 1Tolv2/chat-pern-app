import { ChannelItem, ServerItem, UserItem } from "@chat-app-typescript/shared";
import React, { BaseSyntheticEvent, MouseEventHandler } from "react";
import UserArea from "../../molecules/UserArea";
import ChannelList from "../../molecules/ChannelList";
import FormModal from "../../molecules/FormModal";
import * as s from "./styles";

type Props = {
  states: {
    activeServer: ServerItem | null;
    activeChannel: ChannelItem | null;
    setActiveChannel: React.Dispatch<React.SetStateAction<ChannelItem | null>>;
  };
  user: UserItem;
};

const ChannelSidebar = ({ states, user }: Props) => {
  const { activeServer, activeChannel, setActiveChannel } = states;
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isServerAdmin = () => {
    return (
      user.servers?.find((server) => server.name === activeServer?.name)
        ?.role === "admin"
    );
  };

  const clearModal = async (): Promise<void> => {
    setIsModalOpen(false);
  };

  const handleOnSubmit: MouseEventHandler<HTMLButtonElement> = async (
    e: BaseSyntheticEvent
  ): Promise<void> => {
    e.preventDefault();
    console.log("Submitted", e.target.id);
  };

  return (
    <s.Container>
      <s.Header>
        <h3>{activeServer?.name}</h3>
        {isServerAdmin() && (
          <img
            style={{ cursor: "pointer" }}
            src="person_add.svg"
            alt="add member icon"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        )}
        {isModalOpen && (
          <FormModal
            serverId={activeServer?.id || null}
            title={`Invite friends to ${activeServer?.name}`}
            input={{
              type: "search",
              id: "name",
              bgColor: "darkestGrey",
            }}
            exitModal={clearModal}
            handleOnSubmit={handleOnSubmit}
          />
        )}
      </s.Header>
      <ChannelList
        isAdmin={isServerAdmin()}
        states={{ activeChannel, setActiveChannel, activeServer }}
      />
      <UserArea user={user} />
    </s.Container>
  );
};

export default ChannelSidebar;
