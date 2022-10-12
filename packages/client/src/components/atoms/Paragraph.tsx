import React from "react";
import styled from "styled-components";
import { theme } from "../theme/index";
import * as t from "../theme/typography";

const { colors } = theme;

type Props = {
  children: React.ReactNode;
  color?: string;
  editStyle?: t.FontProps;
};
const StyledParagraph = styled.div`
  white-space: break-spaces;
  word-wrap: break-word;
  color: ${colors.lightestGrey};
`;

const Paragraph = ({ children, color, editStyle }: Props) => {
  return (
    <StyledParagraph>
      <t.Paragraph
        mb={editStyle?.mb}
        mt={editStyle?.mt}
        pl={editStyle?.pl}
        pr={editStyle?.pr}
        pt={editStyle?.pt}
        fontSize={editStyle?.fontSize}
        color={color}
      >
        {children}
      </t.Paragraph>
    </StyledParagraph>
  );
};

export default Paragraph;
