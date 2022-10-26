import styled from "styled-components";
import { theme } from "../../theme";
const { colors } = theme;

const Container = styled.div`
  position: relative;
  background-color: ${colors.darkerGrey};
  width: 240px;
  color: ${colors.lightGrey};
  font-size: 18px;
  font-weight: 500;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  height: 48px;
  box-shadow: 0 1px 2px ${colors.darkestGrey};
  h3 {
    margin: 0;
    margin-top: -4px;
    color: ${colors.white};
  }
  img {
    height: 22px;
  }
`;

export { Container, Header };
