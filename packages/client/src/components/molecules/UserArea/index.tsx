import { UserItem } from "@chat-app-typescript/shared";
import React from "react";
import styled from "styled-components";
import Avatar from "../../atoms/Avatar";
import { theme } from "../../theme";

const { colors } = theme;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 240px;
  height: 52px;
  padding: 0 8px;
  background-color: rgb(32, 34, 37, 0.5);
`;

const TextWrapper = styled.div`
position: relative;
  margin-right: 4px;
  padding: 4px 0 4px 8px;
  color: ${colors.white};
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  min-width: 120px;
  height: 39px;
  padding-left:2px;
  &:hover {
    background-color: ${colors.grey};
    border-radius: 5px;
  }
`;

type Props = {
  user: UserItem;
};

function UserArea({ user }: Props) {
  const firstLetterToUppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <Container>
      <InfoWrapper>
        <Avatar />
        <TextWrapper>{firstLetterToUppercase(user.username)}</TextWrapper>
      </InfoWrapper>
    </Container>
  );
}

export default UserArea;
