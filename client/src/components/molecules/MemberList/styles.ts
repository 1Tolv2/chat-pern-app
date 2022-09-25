import styled from "styled-components"
import { theme } from "../../theme/index"

const {colors} = theme

const Container = styled.div`
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
cursor: pointer;
&.offline {
    opacity: 0.3;
}
&:hover{
    background-color: ${colors.darkGrey};
    &.offline{
        opacity: 1;
    }
}

img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
}
`

export {Container, SectionTitle, MemberList, MemberItem}