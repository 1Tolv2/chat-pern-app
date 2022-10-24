import React from 'react'
import styled from 'styled-components'
import { theme } from '../theme'
const {colors} = theme


type StyleProps = {
    bgColor?: string;
    size?: string;
}
const Container = styled.div`
position: relative;
  width: ${(props: StyleProps) => (props.size ? props.size : "32px")};
  height: ${(props: StyleProps) => (props.size ? props.size : "32px")};;
  border-radius: 50%;
  background-color: ${(props: StyleProps) => props.bgColor || colors.purple};
  margin-left: 2px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
  }
`;

type Props = {
    bgColor?: string;
    size?: string;
}

const Avatar = ({bgColor, size}: Props) => {
  return (
    <Container bgColor={bgColor} size={size}><img src="/ghost-svgrepo-com.svg" alt="avatar"/></Container>
  )
}

export default Avatar