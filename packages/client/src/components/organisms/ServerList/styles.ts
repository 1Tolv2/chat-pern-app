import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  & > * {
    width: 48px;
  }
`;

const StyledList = styled.ul`
  position: relative;
  width: 100%;
`;

const ListItem = styled.li`
  position: relative;
  margin: 0 auto 8px auto;
  width: 100%;
  hr {
    background-color: ${colors.darkGrey};
    width: 32px;
    height: 2px;
    border: none;
    border-radius: 1px;
  } 
  &:hover {
    & > .pill {
      height: 20px;
      width: 8px;
      margin-top: 14px;
      left: 0;
    }
    & > [id^="channel_"] {
      border-radius: 30%;
      background-color: ${colors.purple};
    }
  }
  &#active {
    & > .pill {
      height: 40px;
      width: 8px;
      margin-top: 4px;
      left: 0;
    }
    & > [id^="channel_"] {
      border-radius: 30%;
      background-color: ${colors.purple};
    }
  }


  & > [id^="channel_"] {
    margin: auto;
  }
 
`;
const Pill = styled.div`
  position: absolute;
  left: -4px;
  width: 8px;
  height: 0px;
  margin-top: 24px;
  margin-left: -4px;
  background-color: ${colors.white};
  border-radius: 0 4px 4px 0;
  transition: all 0.2s ease-in;
`;

export { Container, ListItem, Pill, StyledList };
