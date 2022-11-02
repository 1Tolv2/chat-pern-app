import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  max-width: 480px;
  max-height: 480px;
  height: fit-content;
  min-height: 420px;
  padding: 32px;
  background-color: ${colors.darkGrey};
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: ${colors.lightGrey};
  border-radius: 5px;
`;

export { Wrapper, Container };
