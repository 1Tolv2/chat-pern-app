import styled, {css} from "styled-components";
import {theme,ThemeColors} from "./index";

 const {colors} = theme

export type FontProps = {
    color?: string,
    fontSize?: string,
    fontWeight?: string,
    textAlign?: string,
    mb?: string,
    mt?: string,
    pl?: string,
    pr?: string,
    pt?: string,
    lineHeight?: string,
}

const baseStyle = css`
  color: ${(props: FontProps) => (props ? colors[(props.color as string) as keyof ThemeColors] : colors.white)};
  ${(props: FontProps) =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `};
    ${(props: FontProps) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
  text-align: ${(props: FontProps) => (props ? props.textAlign : "center")};
  ${(props: FontProps) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb};
    `};
    ${(props: FontProps) =>
    props.mt &&
    css`
      margin-top: ${props.mt};
    `};
    ${(props: FontProps) =>
    props.pl &&
    css`
      padding-left: ${props.pl};
    `};
    ${(props: FontProps) =>
    props.pr &&
    css`
      padding-right: ${props.pr};
    `};
    ${(props: FontProps) =>
    props.pt &&
    css`
      padding-top: ${props.pt};
    `};
    ${(props: FontProps) =>
    props.lineHeight &&
    css`
      line-height: ${props.lineHeight};
    `};
`;

const H1 = styled.h1`
font-size: 15px;
line-height: 20px;
font-weight: 500;
margin: 0;
${baseStyle}`

const H2 = styled.h2`
line-height: 40px;
font-size: 40px;
color: ${colors.white};
font-weight: 700;
margin: 8px 0;
${baseStyle}`

const H3 = styled.h3`
font-size: 1rem;
font-weight: 500;
line-height: 1.375rem;
margin: 0;
${baseStyle}
`
const H4 = styled(H3)`
line-height: 20px;
margin: 0;
${baseStyle}`

const Paragraph = styled.p`
margin: 0;
font-size: 1rem;
line-height: 1.375rem;
margin: 0;
${baseStyle}
`

export { H1, H2, H3, H4, Paragraph }