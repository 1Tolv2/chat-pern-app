import styled from "styled-components";
import { theme } from "../../theme/index";

const { colors } = theme;

const Container = styled.div`
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
  overflow-y: scroll;
  margin: 5px;
  &::-webkit-scrollbar {
    width: 15px;
    /* border: 1px solid black; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.darkerGrey};
  }
`;

export { Container, Wrapper };
