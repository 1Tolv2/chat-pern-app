import React, { Children } from "react";
import Button from "../../atoms/Button";
import Paragraph from "../../atoms/Paragraph";
import InputWithLabel from "../InputWithLabel";
import * as t from "../../theme/typography";
import { theme } from "../../theme";
import styled from "styled-components";

const { colors } = theme;

const Heading = styled.div`
  text-align: center;
  color: ${colors.lighterGrey};
`;

type Props = {
  type?: string;
  children?: React.ReactNode;
};

const SignForm = ({ type, children }: Props) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  return (
    <>
      <Heading>
        {type === "register" ? (
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
        {type === "register" && (
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
          type="text"
          bgColor="darkestGrey"
          labelText="Password"
          textColor="lighterGrey"
          required
        />
        {type === "register" && (
          <Paragraph editStyle={{ fontSize: "14px", mb: "20px", mt: "4px" }}>
            Forgot your password?
          </Paragraph>
        )}
        <Button>{type === "register" ? "Register" : "Login"}</Button>
        {children}
      </form>
    </>
  );
};

export default SignForm;
