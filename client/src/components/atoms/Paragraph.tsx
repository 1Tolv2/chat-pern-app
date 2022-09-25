import React from 'react'
import styled from 'styled-components'
import {theme} from '../theme/index'

const {colors, typography} = theme

type Props = {
    children: React.ReactNode
}
const StyledParagraph = styled(typography.Paragraph)`
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