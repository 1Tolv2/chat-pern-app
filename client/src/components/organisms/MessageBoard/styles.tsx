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
  margin: 5px 5px 30px 5px;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.darkestGrey};
  }
`;

export { Container, Wrapper };
