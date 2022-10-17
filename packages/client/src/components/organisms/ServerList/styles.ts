import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 72px;
  text-align: center;
  & > * {
    width: 48px;
  }
`;

export { Container };
