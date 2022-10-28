import styled from "styled-components";
import { theme } from "../../theme";

const { colors } = theme;

const Container = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
  box-shadow: 0 2px 1px rgba(32, 34, 37, 0.7);
  overflow-y: hidden;
  padding: 0 16px 16px 16px;
`;

const MemberList = styled.ul`
  overflow-y: scroll;
  max-height: 200px;
  box-sizing: border-box;
  padding: 8px 0 0 8px;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.darkestGrey};
    border-radius: 5px;
  }
`;

const MemberItem = styled.li`
  display: grid;
  grid-template-columns: 30px auto 72px;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 7px 16px 7px 8px;
  h4 {
    margin: 0;
    padding-bottom: 3px;
    font-weight: 500;
  }
  &:hover {
    background-color: ${colors.grey};
    border-radius: 5px;
    & button {
      background-color: ${colors.green} !important;
    }
  }
`;

export { Container, InputContainer, MemberList, MemberItem };
