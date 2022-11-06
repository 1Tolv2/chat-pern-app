import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { theme } from "../theme";
import AddChannel from "./AddChannel";
import FriendSearch from "./FriendSearch/";
const { colors } = theme;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 105%;
  width: 350px;
  height: fit-content;
  padding-bottom: 16px;
  background-color: ${colors.darkGrey};
  border-radius: 5px;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.5);
  z-index: 10;
  h3 {
    position: relative;
    padding: 16px;
    color: ${colors.white};
    margin: 0;
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  height: 24px !important;
  width: 24px;
  transform: rotate(45deg);
  cursor: pointer;
  z-index: 1;
`;

type Props = {
  exitModal: MouseEventHandler<HTMLImageElement | HTMLButtonElement>;
  handleOnSubmit?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  serverId?: string | null;
  input: {
    labelText?: string;
    textColor?: string;
    id: string;
    type: "input" | "search";
    value?: string | null;
    setValue?:
      | React.Dispatch<React.SetStateAction<string | string[]>>
      | ((value: string) => void);
    bgColor?: string;
    placeholder?: string;
  };
};

const FormModal = ({
  serverId,
  input,
  title,
  handleOnSubmit,
  exitModal,
}: Props) => {
  return (
    <ModalContainer>
      <CloseIcon src="/add.svg" alt="close icon" onClick={exitModal} />
      <h3>{title}</h3>
      {input.type === "search" ? (
        <FriendSearch serverId={serverId || null} />
      ) : (
        <AddChannel
          input={input}
          title={title}
          exitModal={exitModal}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          handleOnSubmit={handleOnSubmit ? handleOnSubmit : () => {}}
        />
      )}
    </ModalContainer>
  );
};

export default FormModal;
