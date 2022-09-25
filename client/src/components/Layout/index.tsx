import React from "react";
import styled from "styled-components";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Container = styled.div`
  padding: 1rem 0 0 5rem;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Wrapper = styled.main`
display: grid;
grid-template-columns: auto 1fr;
border-top-left-radius: 5px;

`;

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Layout;
