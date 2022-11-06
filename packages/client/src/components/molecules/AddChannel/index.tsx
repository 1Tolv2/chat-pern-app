import React, { MouseEventHandler } from "react";
import Button from "../../atoms/Button";
import InputWithLabel from "../InputWithLabel";
import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${colors.darkerGrey};
  margin: 16px -16px -16px -16px;
  padding: 16px;
`;

const InputContainer = styled.div`
  padding: 0 16px;
`;

type Props = {
  exitModal: MouseEventHandler<HTMLImageElement | HTMLButtonElement>;
  handleOnSubmit: MouseEventHandler<HTMLButtonElement>;
  title: string;
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

const AddChannel = ({ input, title, exitModal, handleOnSubmit }: Props) => {
  return (
    <InputContainer>
      <InputWithLabel
        placeholder={input.placeholder}
        labelText={input.labelText}
        textColor={input.textColor}
        id={input.id}
        type="text"
        value={input.value || null}
        setValue={input.setValue || null}
        bgColor={input?.bgColor || ""}
      />
      <ButtonContainer>
        <Button
          type="outlined"
          width="fit-content"
          bgColor="darkerGrey"
          onClick={exitModal}
        >
          Cancel
        </Button>
        <Button type="filled" width="fit-content" onClick={handleOnSubmit}>
          {title}
        </Button>
      </ButtonContainer>
    </InputContainer>
  );
};

export default AddChannel;
