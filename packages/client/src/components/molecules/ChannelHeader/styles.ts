import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 38px;
  align-items: center;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 8px;
  margin-bottom: 5px;
  span {
    cursor: pointer;
    img {
      width: 19px;
    }
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 105%;
  width: 350px;
  height: fit-content;
  padding: 16px;
  background-color: ${colors.darkGrey};
  border-radius: 5px;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.5);
  z-index: 10;
  h3 {
    position: relative;
    margin: 0 0 16px 0;
    color: ${colors.white};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${colors.darkerGrey};
  margin: 16px -16px -16px -16px;
  padding: 16px;
`;

export { Container, ModalContainer, ButtonContainer };
