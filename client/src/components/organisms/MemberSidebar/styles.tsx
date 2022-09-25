import styled from "styled-components";
import {theme} from '../../theme/index'

const {colors} = theme

const Container = styled.div``;
const MembersContainer = styled.aside`
min-width: 240px;
height: 100%;
background-color: ${colors.darkerGrey};
`

export { Container, MembersContainer };