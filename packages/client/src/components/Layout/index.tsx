import React, { createContext, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import { UserItem } from "@chat-app-typescript/shared";
import { getUser } from "../../global/api";

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

interface ModalCtx {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalContext = createContext<ModalCtx>({} as ModalCtx);

interface UserCtx {
  user: UserItem | null;
  setUser: React.Dispatch<React.SetStateAction<UserItem | null>>;
}
const defaultUserState = {
  user: null,
  setUser: () => {},
};
const UserContext = createContext<UserCtx>(defaultUserState);

export default function Layout({ children }: Props) {
  const [user, setUser] = useState<UserItem | null>(null);
  const [modalVisible, setModalVisible] = useState(true);

  const fetchUser = async () => {
    const res = await getUser();
    if (res.status === 200) {
      setUser(res.data);
      setModalVisible(false)
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
        <Container>
          <Wrapper>{children}</Wrapper>
        </Container>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}
export { ModalContext, UserContext };
