import React from "react";
import styled from "styled-components";
import { theme } from "../theme/index";

const { colors } = theme;

const StyledField = styled.input`
  height: 45px;
  width: 100%;
  padding: 11px 16px;
  font-family: inherit;
  font-size: 1rem;
  color: ${colors.white};
  background-color: ${colors.grey};
  border: none;
  border-radius: 5px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

type Props = {
  id: string;
  setValue: (value: string) => void;
  value: string;
  placeholder?: string;
  type: string;
};

const Textarea = ({ setValue, id, value, placeholder, type }: Props) => {
  return (
    <StyledField
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};

export default Textarea;
