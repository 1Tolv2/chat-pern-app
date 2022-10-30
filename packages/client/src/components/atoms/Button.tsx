import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";
import React from "react";
import styled, { css } from "styled-components";
import { theme, ThemeColors } from "../theme";

const { colors } = theme;

type StyledProps = {
  bgColor?: string;
  color?: string;
  width?: string;
  buttonType?: "filled" | "outlined";
  height?: string;
  fontSize?: string;
};
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 16px 2px 16px;
  margin-bottom: "8px";
  border-radius: 3px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  font-size: ${(props) => props.fontSize || "16px"};
  width: ${(props: StyledProps) => props.width || "100%"};
  height: ${(props: StyledProps) => props.height || "38px"};
  ${(props: StyledProps) =>
    props.buttonType === "outlined"
      ? css`
          background-color: transparent;
          border: 1px solid
            ${(props: StyledProps) =>
              props.bgColor
                ? colors[props.bgColor as string as keyof ThemeColors]
                : colors.purple};
          color: ${(props: StyledProps) =>
            props.color
              ? colors[props.color as string as keyof ThemeColors]
              : colors.white};
        `
      : css`
          background-color: ${(props: StyledProps) =>
            props.bgColor
              ? colors[props.bgColor as string as keyof ThemeColors]
              : colors.purple};
          color: ${(props: StyledProps) =>
            props.color
              ? colors[props.color as string as keyof ThemeColors]
              : colors.white};
          border: 1px solid
            ${colors[props.color as string as keyof ThemeColors] ||
            colors.purple};
        `}
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

type Props = {
  children?: React.ReactNode;
  onClick?: (() => void) | ((e: any) => void);
  width?: string;
  type?: "outlined" | "filled";
  height?: string;
  fontSize?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
};

const Button = ({
  className,
  id,
  fontSize,
  height,
  type,
  children,
  onClick,
  bgColor,
  color,
  width,
  disabled,
}: Props & StyledProps) => {
  return (
    <StyledButton
      className={className}
      id={id}
      fontSize={fontSize}
      buttonType={type || "filled"}
      onClick={onClick}
      bgColor={bgColor}
      color={color}
      width={width}
      height={height}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
