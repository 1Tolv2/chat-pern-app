import React from "react";
import styled from "styled-components";
import { theme, ThemeColors } from "../theme";

const { colors } = theme;

const StyledLabel = styled.label`
  margin-bottom: 8px;
  color: ${(props) =>
    props.color
      ? colors[props.color as string as keyof ThemeColors]
      : colors.white};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
`;

type Props = {
  id: string;
  required?: boolean;
  text?: string;
  color?: string;
};

const Label = ({ id, required, text, color }: Props) => {
  //TODO: add htmlFor, but issues with intrinsicAttributes
  return (
    <StyledLabel color={color}>
      {text} {required && <span style={{ color: colors.red }}>*</span>}
    </StyledLabel>
  );
};

export default Label;
