import React, { useState } from "react";
import Button from "../../atoms/Button";
import InputField from "../../atoms/InputField";
import Paragraph from "../../atoms/Paragraph";
import InputWithLabel from "../InputWithLabel";
import * as s from "./styles";

type Props = {
  isAdmin: boolean;
  serverId: number;
};

const AdminChannelModal = ({ isAdmin, serverId }: Props) => {
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

const clearModal = () => {
  setName("");
  setIsModalOpen(false);
}

  const addChannel = async () => {
    console.log("CLICKED", name, serverId);
    // const res = await createChannel(channelName, channelDescription, states.activeServer?.id || 1);
    // res === 201 && handleActiveChannel()
  };
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
            <InputWithLabel labelText="Channel name" textColor="lightGrey" id="name" type="text" value={name} setValue={setName} bgColor="darkestGrey"/>
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
