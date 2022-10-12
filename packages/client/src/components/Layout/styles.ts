import styled from "styled-components";

const Container = styled.div`
  padding: 1rem 0 0 0rem;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 5rem auto 1fr;
  border-top-left-radius: 5px;
  height: 100%;
`;

export { Container, Wrapper };
