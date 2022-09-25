import styled from "styled-components";
import { theme } from "../../theme/index";

const { colors } = theme;

const Container = styled.div`
  height: 94%;
  width: 100%;
  background-color: ${colors.darkGrey};
`;

const ChannelContainer = styled.div`
  display: flex;
  height: 100%;
`;

const MessageBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 100%;
`;

export { Container, ChannelContainer, MessageBoardWrapper };
