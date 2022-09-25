import React from 'react'
import styled from 'styled-components'
import {theme} from '../theme/index'

const {colors} = theme

const StyledField = styled.textarea`
resize: none;
box-sizing: border-box;
background-color: ${colors.grey};
border: none;
border-radius: 5px;
height: 45px;
padding: 11px 16px;
margin: 0 8px 24px 8px;
color: ${colors.white};
font-family: inherit;
font-size: 1rem;
&:focus {
  outline: none;
}
`

type Props = {}

const Textarea = (props: Props) => {
  return (
    <StyledField placeholder='Message..'/>
  )
}

export default Textarea