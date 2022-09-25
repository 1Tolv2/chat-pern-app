import styled from "styled-components";

const Container = styled.li`
&:hover{
    background-color: #34363d;
}
`

const ProfileImage = styled.img`
position: absolute;
left: 16px;
width: 40px;
height: 40px;
border-radius: 50%;
overflow: hidden;
cursor: pointer;
`

const MessageWrapper = styled.div`
position: relative;
display: flex;
flex-direction: row;
align-items: flex-start;
margin-top: 1.0625rem;
min-height: 2.75rem;
padding: 0.125rem 48px 0.125rem 72px;
`

const Heading = styled.h3`
font-size: 1rem;
font-weight: 500;
line-height: 1.375rem;
display: inline;
cursor: pointer;
&:hover{
    text-decoration: underline;
    text-decoration-thickness: 2px;
}
`

export {Container, ProfileImage, MessageWrapper, Heading}