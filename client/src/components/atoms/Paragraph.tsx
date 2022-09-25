import React from 'react'
import styled from 'styled-components'
import {theme} from '../theme/index'
import * as t from '../theme/typography'

const {colors} = theme

type Props = {
    children: React.ReactNode,
    fontSize?: string,
    color?: string,
}
const StyledParagraph = styled(t.Paragraph)`
white-space: break-spaces;
word-wrap: break-word;
color: ${colors.lightestGrey};
`

const Paragraph = ({children, fontSize, color}: Props) => {
  return (
    <StyledParagraph fontSize={fontSize} color={color}>{children}</StyledParagraph>
  )
}

export default Paragraph