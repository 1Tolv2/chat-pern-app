import styled from "styled-components";
import {theme} from '../../theme/index'

const {colors} = theme

const Container = styled.div``;

const MembersContainer = styled.aside`
min-width: 240px;
height: 100%;
background-color: ${colors.darkerGrey};
overflow-y: scroll;
&::-webkit-scrollbar {
    width: 15px;
  }
&::-webkit-scrollbar-thumb {
    background-color: ${colors.darkestGrey};
  }
`

export { Container, MembersContainer};