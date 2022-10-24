import styled from "styled-components";
import { theme } from "../../theme";
import * as t from "../../theme/typography";

const { colors } = theme;

const Container = styled.div`
margin: 16px;
`


const Header = styled(t.H2)`
  color: ${colors.white};
`;

const IconContainer = styled.div`
position: relative;
width: 68px;
height: 68px;
border-radius: 50%;
background-color: ${colors.accentGrey};
color: ${colors.white};
img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`

export { Container, Header,IconContainer };
