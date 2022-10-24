import { ChannelItem } from "@chat-app-typescript/shared";
import React, { useState } from "react";
import { createChannel } from "../../../global/api";
import Button from "../../atoms/Button";
import Paragraph from "../../atoms/Paragraph";
import InputWithLabel from "../InputWithLabel";
import * as s from "./styles";

type ChannelAction = {
  type: "add" | "remove" | "replace";
  input: ChannelItem | ChannelItem[];
};

type Props = {
  isAdmin: boolean;
  serverId: number;
  setState: React.Dispatch<React.SetStateAction<ChannelItem | null>>;
  modifyChannelList: React.Dispatch<ChannelAction>;
};

const AdminChannelModal = ({ isAdmin, serverId, setState, modifyChannelList}: Props) => {
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

const clearModal = () => {
  setName("");
  setIsModalOpen(false);
}

  const addChannel = async () => {
    const res: any = await createChannel(name, serverId || 0);
    if(res.status === 201 && res.data.channel) {
      modifyChannelList({type: "add", input: (res.data.channel as ChannelItem)});
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
          <span onClick={() => setIsModalOpen(true)}>{isModalOpen ? "-":"+"}</span>
          {isModalOpen && <s.ModalContainer>
            <h3>Create Channel</h3>
            <InputWithLabel labelText="Channel name" textColor="lightGrey" id="name" type="text" value={name} setValue={handleOnChange} bgColor="darkestGrey"/>
            <s.ButtonContainer>
            <Button width="fit-content" bgColor="darkerGrey" onClick={clearModal}>Cancel</Button>
              <Button width="fit-content" onClick={addChannel}>Create Channel</Button>
            </s.ButtonContainer>
          </s.ModalContainer>}
        </>
      )}
    </s.Container>
  );
};

export default AdminChannelModal;
