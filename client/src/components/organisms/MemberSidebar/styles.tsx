import styled from "styled-components";
import {theme} from '../../theme/index'

const {colors} = theme

const Container = styled.div``;

const MembersContainer = styled.aside`
min-width: 240px;
height: 100%;
background-color: ${colors.darkerGrey};
`

const SectionTitle = styled.div`
width: 100%;
padding: 24px 8px 0 16px;

`

const MemberList = styled.ul`
margin-left: 8px;
padding: 0 8px;
`

const MemberItem = styled.li`
display: flex;
align-items: center;
height: 42px;
border-radius: 5px;
img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
}
&:hover{
    background-color: ${colors.darkGrey};
}
`

export { Container, MembersContainer, SectionTitle, MemberList, MemberItem };