import React from "react";
import styled from "styled-components";
import { theme, ThemeColors } from "../theme";

const { colors } = theme;

type StyledProps = {
  bgColor?: string;
  color?: string;
};
const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 2px 16px 5px 16px;
  margin-bottom: "8px";
  background-color: ${(props: StyledProps) =>
    props.bgColor
      ? colors[props.bgColor as string as keyof ThemeColors]
      : colors.purple};
  color: ${(props: StyledProps) =>
    props.color
      ? colors[props.color as string as keyof ThemeColors]
      : colors.white};
  border-radius: 3px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick, bgColor, color }: Props & StyledProps) => {
  return (
    <StyledButton onClick={onClick} bgColor={bgColor} color={color}>
      {children}
    </StyledButton>
  );
};

export default Button;
