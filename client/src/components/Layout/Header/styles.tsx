import styled from "styled-components";
import { theme } from "../../theme/index";

const { colors } = theme;

const ChannelBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 8px;
  background-color: ${colors.darkGrey};
  box-shadow: 0 1px 2px ${colors.darkestGrey};
  overflow: hidden;
  img {
    width: 24px;
    height: 24px;
    margin: 0 8px;
  }
`;

export { ChannelBar };
