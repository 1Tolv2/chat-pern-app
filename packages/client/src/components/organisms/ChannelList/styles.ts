import styled from "styled-components";
import { theme, ThemeColors } from "../../theme";

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
`

const StyledChannelItem = styled.li`
box-sizing: border-box;
width: 100%;
margin-left: 8px;
padding: 5px 8px 7px 8px;
border-radius: 4px;
&:hover {
  background-color: ${colors.darkGrey};
  color: ${colors.lightestGrey};
}
`

const Header = styled.div`
padding: 12px 16px;
height: 48px;
box-shadow: 0 1px 2px ${colors.darkestGrey};
h3 {
  margin: 0;
}
`

export { Container, StyledChanneList, StyledChannelItem, Header };
