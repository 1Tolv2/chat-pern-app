import React from 'react'
import styled from 'styled-components'
import {theme} from '../theme/index'

const {colors} = theme

type Props = {
    children: React.ReactNode
}
const StyledParagraph = styled.p`
margin: 0;
font-size: 1rem;
line-height: 1.375rem;
white-space: break-spaces;
word-wrap: break-word;
color: ${colors.lightestGrey};
`

const Paragraph = ({children}: Props) => {
  return (
    <StyledParagraph>{children}</StyledParagraph>
  )
}

export default Paragraph