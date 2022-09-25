import styled from "styled-components";
import { theme } from "../../theme";
import * as t from "../../theme/typography";

const { colors } = theme;

const Header = styled(t.H2)`
  color: ${colors.white};
`;

export { Header };
