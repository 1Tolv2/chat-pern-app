import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { theme, ThemeColors } from "../theme";

const { colors } = theme;

type Props = {
  type: string;
  id: string;
  value: string;
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  placeholder?: string;
  label?: string;
  required?: boolean;
  bgColor: string;
  mb?: string;
  color?: string;
};

type StyleProps = {
  bgColor?: string;
  color?: string;
  mb?: string;
};
const StyledInput = styled.input`
  border: none;
  padding: 10px;
  height: 40px;
  width: 100%;
  margin-bottom: ${(props) => (props.mb ? props.mb : "0px")};
  background-color: ${(props: StyleProps) =>
    props.bgColor && colors[props.bgColor as string as keyof ThemeColors]};
  color: ${(props) =>
    props.color
      ? colors[props.color as string as keyof ThemeColors]
      : colors.lighterGrey};
  font-weight: 400;
  font-size: 16px;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const InputField = ({
  type,
  id,
  value,
  setValue,
  placeholder,
  required,
  bgColor,
  mb,
  color,
}: Props) => {
  return (
    <>
      <StyledInput
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        bgColor={bgColor}
        mb={mb}
        color={color}
      />
    </>
  );
};

export default InputField;
