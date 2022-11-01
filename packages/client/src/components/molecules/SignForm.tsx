import React, { useContext, useState, ReactNode } from "react";
import Button from "../atoms/Button";
import Paragraph from "../atoms/Paragraph";
import InputWithLabel from "./InputWithLabel";
import * as t from "../theme/typography";
import { theme } from "../theme";
import styled from "styled-components";
import { ModalContext, UserContext } from "../Layout";
import { loginUser, registerUser } from "../../global/api";
import { AxiosError } from "axios";

const { colors } = theme;

const Heading = styled.div`
  text-align: center;
  color: ${colors.lighterGrey};
`;

type Props = {
  type?: {
    formType: "login" | "register";
    setFormType: (type: "login" | "register") => void;
  };
  children?: ReactNode;
};

const SignForm = ({ type, children }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { setModalVisible } = useContext(ModalContext);
  const { setUser } = useContext(UserContext);

  const handleOnClick = async (e: any): Promise<void> => {
    e.preventDefault();
    if (type?.formType === "register") {
      const res = await registerUser(email, username, password);
      res && type?.setFormType("login");
    } else if (type?.formType === "login") {
      try {
        const user = await loginUser(username, password);
        if (user) {
          setModalVisible(false);
          setUser(user);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(err.message);
        }
      }
    }
  };

  const disableClass = () => {
    if (type?.formType === "register") {
      return username === "" || email === "" || password === ""
        ? "disabled"
        : "";
    } else if (type?.formType === "login") {
      return username === "" || password === "" ? "disabled" : "";
    }
  };
  return (
    <>
      <Heading>
        {type?.formType === "register" ? (
          <t.H1 fontSize="27px" fontWeight="700" color="white" mb="8px">
            Create an account
          </t.H1>
        ) : (
          <>
            <t.H1 fontSize="27px" fontWeight="700" color="white" mb="8px">
              Welcome back!
            </t.H1>
            <Paragraph>{"We're so excited to see you again!"}</Paragraph>
          </>
        )}
      </Heading>
      <form>
        {type?.formType === "register" && (
          <InputWithLabel
            id="email"
            value={email}
            setValue={setEmail}
            mb="20px"
            type="text"
            bgColor="darkestGrey"
            labelText="Email"
            textColor="lighterGrey"
            required
          />
        )}
        <InputWithLabel
          id="username"
          value={username}
          setValue={setUsername}
          mb="20px"
          type="text"
          bgColor="darkestGrey"
          labelText="Username"
          textColor="lighterGrey"
          required
        />
        <InputWithLabel
          id="password"
          value={password}
          setValue={setPassword}
          mb="20px"
          type="password"
          bgColor="darkestGrey"
          labelText="Password"
          textColor="lighterGrey"
          required
        />
        {type?.formType === "login" && (
          <Paragraph editStyle={{ fontSize: "14px", mb: "20px", mt: "4px" }}>
            Forgot your password?
          </Paragraph>
        )}
        <Button
          className={disableClass()}
          onClick={handleOnClick}
          disabled={disableClass() === "disabled"}
        >
          {type?.formType === "register" ? "Register" : "Login"}
        </Button>
        {children}
      </form>
    </>
  );
};

export default SignForm;
