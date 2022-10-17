import styled from "styled-components";
import { theme } from "../../theme/index";

const { colors } = theme;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 100%;
  background-color: ${colors.darkGrey};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-end;
  height: 100%;
  margin: 5px 5px 30px 5px;
`;

const ScrollContainer = styled.div`
  position: relative;
  bottom: 50px;
  height: fit-content;
  max-height: 84vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 15px;
    background-color: ${colors.darkerGrey};
    border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.darkestGrey};
    border-radius: 15px;
  }
`;

export { Container, Wrapper, ScrollContainer };
