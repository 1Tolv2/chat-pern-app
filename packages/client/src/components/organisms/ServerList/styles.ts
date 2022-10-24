import styled from "styled-components";
import {theme} from "../../theme";

const {colors} = theme

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 72px;
  text-align: center;
  & > * {
    width: 48px;
  }
`;

const ListItem = styled.li`
margin-bottom: 8px;
hr {
  background-color: ${colors.darkGrey};
  width: 32px;
  height:2px;
  border: none;
  border-radius: 1px;
}
`

export { Container,ListItem };
