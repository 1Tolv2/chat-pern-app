import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const Container = styled.div`
  background-color: ${colors.darkerGrey};
  width: 240px;
  color: ${colors.lightGrey};
  font-size: 18px;
  font-weight: 500;
`;

const StyledChanneList = styled.ul`
  width: 100%;
  padding-right: 16px;
  min-width: "64px";
`;

const StyledChannelItem = styled.li`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-left: 8px;
  margin-bottom: 2px;
  padding: 5px 8px 7px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.darkGrey};
    color: ${colors.lightestGrey};
  }
  &.active {
    background-color: ${colors.grey};
    color: ${colors.white};
  }
  img {
    width: 24px;
  }
`;

const ListLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 8px;
  margin-bottom: 5px;
`;

export {
  Container,
  StyledChanneList,
  StyledChannelItem,
  ListLabelWrapper,
};
