import styled from "styled-components";
import { theme } from "../../theme";

const {colors} = theme;

const Container = styled.div`
position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 8px;
  margin-bottom: 5px;
  span {
  cursor: pointer;

  }
`

const ModalContainer = styled.div`
position: absolute;
top: 0;
left: 110%;
width: 350px;
height: fit-content;
padding: 16px;
background-color: ${colors.darkGrey};
border-radius: 5px;
box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
z-index: 10;
h3 {
  margin: 0 0 16px 0;
  color:${colors.white};
}
`

const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
background-color: ${colors.darkerGrey};
margin: 16px -16px -16px -16px;
padding: 16px;
`

export {Container, ModalContainer, ButtonContainer}