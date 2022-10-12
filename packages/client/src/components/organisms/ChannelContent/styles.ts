import styled from "styled-components";
import { theme } from "../../theme/index";

const { colors } = theme;

const Container = styled.div`
  display: flex;
  height: 95%;
  width: 100%;
  background-color: ${colors.darkGrey};
`;

export { Container };
