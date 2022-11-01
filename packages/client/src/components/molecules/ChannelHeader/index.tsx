import { ChannelItem } from "@chat-app-typescript/shared";
import { AxiosResponse } from "axios";
import React, { useState, Dispatch } from "react";
import { createChannel } from "../../../global/api";
import Paragraph from "../../atoms/Paragraph";
import FormModal from "../FormModal";
import * as s from "./styles";

type Props = {
  isAdmin: boolean;
  serverId: string;
  modifyChannelList: Dispatch<any>;
};

const ChannelHeader = ({ isAdmin, serverId, modifyChannelList }: Props) => {
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearModal = async (): Promise<void> => {
    setName("");
    setIsModalOpen(false);
  };

  const addChannel = async () => {
    const res: AxiosResponse = await createChannel(name, serverId);
    if (res.status === 201 && res.data.channel) {
      modifyChannelList({
        type: "add",
        input: res.data.channel as ChannelItem,
      });
      clearModal();
    }
  };

  function handleOnChange(value: string) {
    setName(value.replace(/\s/g, "-"));
  }
  return (
    <s.Container>
      <Paragraph
        editStyle={{ fontSize: "14px", fontWeight: "500" }}
        color="lightGrey"
      >
        {"Text Channels".toUpperCase()}
      </Paragraph>
      {isAdmin && (
        <>
          <span onClick={() => setIsModalOpen(true)}>
            <img src={isModalOpen ? "/remove.svg" : "/add.svg"} alt="icon" />
          </span>
          {isModalOpen && (
            <FormModal
              title="Create Channel"
              input={{
                labelText: "Channel name",
                textColor: "lightGrey",
                id: "users",
                type: "input",
                value: name,
                setValue: handleOnChange,
                bgColor: "darkestGrey",
              }}
              exitModal={clearModal}
              handleOnSubmit={addChannel}
            />
          )}
        </>
      )}
    </s.Container>
  );
};

export default ChannelHeader;
