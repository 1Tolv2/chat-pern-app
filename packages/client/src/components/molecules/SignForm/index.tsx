import React, { useContext } from "react";
import Button from "../../atoms/Button";
import Paragraph from "../../atoms/Paragraph";
import InputWithLabel from "../InputWithLabel";
import * as t from "../../theme/typography";
import { theme } from "../../theme";
import styled from "styled-components";
import { loginUser, registerUser } from "../../../global/api";
import { ModalContext } from "../../Layout";
import { CustomError } from "../../../global/types";
import { UserContext } from "../../Layout";

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
  children?: React.ReactNode;
};

const SignForm = ({ type, children }: Props) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const { setModalVisible } = useContext(ModalContext);
  const { setUser } = useContext(UserContext);

  const handleOnClick = async (e:any) => {
    e.preventDefault()
    if (type?.formType === "register") {
      const res = await registerUser(email, username, password);
      res && type?.setFormType("login");
    } else if (type?.formType === "login") {
      try {
        const user = await loginUser(username, password);
          setModalVisible(false)
          setUser(user)
      } catch (err) {
        if (err instanceof CustomError) {
          console.error(err.data);
        }
      }
    }
  };

  const disableClass = () => {
    if (type?.formType === "register") {
      return (username === "" || email === "" || password === "") ? "disabled" : ""
    } else if (type?.formType === "login") {
      return (username === "" || password === "") ? "disabled" : ""

    }
  }
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
            <Paragraph>We're so excited to see you again!</Paragraph>
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
        {type?.formType === "register" && (
          <Paragraph editStyle={{ fontSize: "14px", mb: "20px", mt: "4px" }}>
            Forgot your password?
          </Paragraph>
        )}
        <Button onClick={handleOnClick} className={disableClass()}>
          {type?.formType === "register" ? "Register" : "Login"}
        </Button>
        {children}
      </form>
    </>
  );
};

export default SignForm;
