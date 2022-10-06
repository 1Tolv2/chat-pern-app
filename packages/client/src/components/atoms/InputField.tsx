import React from "react";
import styled from "styled-components";
import { theme, ThemeColors } from "../theme";

const { colors } = theme;

type Props = {
  type: string;
  //   id: string;
  //   value: string;
  //   setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  label?: string;
  required?: boolean;
  bgColor: string;
  mb?: string;
};

type StyleProps = {
  bgColor?: string;
  mb?: string;
};
const StyledInput = styled.input`
  border: none;
  padding: 10px;
  height: 40px;
  width: 100%;
  margin-bottom: ${(props) => (props.mb ? props.mb : "0px")};
  background-color: ${({ bgColor }: StyleProps) =>
    bgColor && colors[bgColor as string as keyof ThemeColors]};
  font-weight: 400;
  font-size: 16px;
  border-radius: 3px;
`;

const InputField = ({
  type,
  //   id,
  //   value,
  //   setValue,
  label,
  placeholder,
  required,
  bgColor,
  mb,
}: Props) => {
  console.log(bgColor);
  return (
    <>
      <StyledInput
        type={type}
        //   id={id}
        //   value={value}
        //   onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        bgColor={bgColor}
        mb={mb}
      />
    </>
  );
};

export default InputField;
