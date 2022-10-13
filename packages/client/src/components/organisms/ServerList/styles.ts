import styled from "styled-components";
import { theme, ThemeColors } from "../../theme";

const { colors } = theme;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 72px;
  text-align: center;
  & > * {
    width: 48px;
  }
`;

export { Container };
