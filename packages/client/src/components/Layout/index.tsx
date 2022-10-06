import React, { createContext, useState } from "react";
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
  height: 100%;
`;

interface ModalContext {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalContext = createContext<ModalContext>({} as ModalContext);


export default function Layout ({ children }: Props){
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      <Container>
        <Wrapper>{children}</Wrapper>
      </Container>
    </ModalContext.Provider>
  );
};
export { ModalContext };
