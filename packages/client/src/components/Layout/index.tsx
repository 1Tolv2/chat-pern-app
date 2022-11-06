/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect } from "react";
import { UserItem } from "@chat-app-typescript/shared";
import { getUser } from "../../global/api";
import * as s from "./styles";

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

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [user, setUser] = useState<UserItem | null>(null);
  const [modalVisible, setModalVisible] = useState(true);

  const fetchUser = async () => {
    const res = await getUser();
    if (res.status === 200) {
      setUser(res.data);
      setModalVisible(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [modalVisible]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
        <s.Container>
          <s.Wrapper>{children}</s.Wrapper>
        </s.Container>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}
export { ModalContext, UserContext };
