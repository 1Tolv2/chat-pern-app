import styled, {css} from "styled-components";
import {theme,ThemeColors} from "./index";

 const {colors} = theme

type Props = {
    color?: string,
    fontSize?: string,
    fontWeight?: string,
    textAlign?: string,
    mb?: string,
    mt?: string,
    lineHeight?: string,
}

const baseStyle = css`
  color: ${(props: Props) => (props ? colors[(props.color as string) as keyof ThemeColors] : colors.white)};
  ${(props: Props) =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `};
    ${(props: Props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
  text-align: ${(props: Props) => (props ? props.textAlign : "center")};
  ${(props: Props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb};
    `};
    ${(props: Props) =>
    props.mt &&
    css`
      margin-top: ${props.mt};
    `};
    ${(props: Props) =>
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
font-size: 34px;
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