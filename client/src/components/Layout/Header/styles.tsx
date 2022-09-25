import styled from "styled-components";
import { theme } from "../../theme/index";

const { colors } = theme;

const ChannelBar = styled.div`
position: relative;
  display: flex;
  align-items: center;
  background-color: ${colors.darkGrey};
  box-shadow: 0 1px 2px ${colors.darkestGrey};
  padding: 0 8px;
  overflow: hidden;
`;

export { ChannelBar };