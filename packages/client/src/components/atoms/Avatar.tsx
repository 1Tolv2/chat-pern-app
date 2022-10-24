import React from "react";
import styled, { css } from "styled-components";
import { theme, ThemeColors } from "../theme";
const { colors } = theme;

type StyleProps = {
  bgColor?: string;
  size?: string;
  hover?: boolean;
};
const Container = styled.div`
  position: relative;
  width: ${(props: StyleProps) => (props.size ? props.size : "32px")};
  height: ${(props: StyleProps) => (props.size ? props.size : "32px")};
  border-radius: 50%;
  background-color: ${(props: StyleProps) => colors[props.bgColor as keyof ThemeColors] || colors.purple};
  ${(props: StyleProps) => props.hover && css`
  transition: all 0.2s ease-in-out;
  &:hover {
    border-radius: 30%;
    background-color: ${colors.purple};
  }
  `}
  img {
    width: 100%;
    margin-top: 2px;
  }
  span {
    display: block;
    margin-bottom: 2px;
    font-size: 18px;
    font-weight: 600;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  bgColor?: string;
  size?: string;
  text?: string;
  hover?: boolean;
};

const Avatar = ({ bgColor, size, text, hover}: Props) => {

  console.log(hover)
  return (
    <Container bgColor={bgColor} size={size} hover={hover}>
      <IconContainer>
        {text ? (
          <span>{text}</span>
        ) : (
          <img src="/ghost-svgrepo-com.svg" alt="avatar" />
        )}
      </IconContainer>
    </Container>
  );
};

export default Avatar;
