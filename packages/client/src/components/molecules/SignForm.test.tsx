/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch } from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import SignForm from "./SignForm";
import * as api from "../../global/api";
import { UserItem } from "@chat-app-typescript/shared";

type LoginResponse = {
  user: Partial<UserItem>;
  token: string;
};

jest.mock("../../global/api", () => {
  const mockUser: LoginResponse = {
    user: {
      id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
      username: "tolv",
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYzQyNmM0NC03NWQ3LTQ2ZmUtOTlmOS0xMDc5M2VkMWFkYmIiLCJ1c2VybmFtZSI6InRvbHYiLCJpYXQiOjE2NjczMjIxNjksImV4cCI6MTY2NzMyOTM2OSwic3ViIjoiYmM0MjZjNDQtNzVkNy00NmZlLTk5ZjktMTA3OTNlZDFhZGJiIn0.--gPG_bUOl85CzCqUiaXIbdF7NvmWOcydBntHYOv4kw",
  };
  return {
    __esModule: true,
    ...jest.requireActual("../../global/api"),
    registerUser: () => Promise.resolve(200),
    loginUser: () => Promise.resolve(mockUser),
  };
});

describe("Testing SignForm", () => {
  describe("Testing form type register", () => {
    test("Should render register form on type register", () => {
      render(
        <SignForm type={{ formType: "register", setFormType: () => {} }} />
      );

      expect(screen.getByRole("heading")).toHaveTextContent(
        "Create an account"
      );
      expect(screen.getByRole("button")).toHaveTextContent("Register");
      const inputs = screen.getAllByRole("textbox");
      expect(inputs).toHaveLength(2);
    });

    test("Should have email, username and password inputs", () => {
      render(
        <SignForm type={{ formType: "register", setFormType: () => {} }} />
      );
      const inputs = screen.queryAllByDisplayValue("");
      expect(inputs).toHaveLength(3);

      expect(inputs[0]).toHaveAttribute("type", "text");
      expect(inputs[0]).toHaveAttribute("id", "email");
      expect(inputs[1]).toHaveAttribute("type", "text");
      expect(inputs[1]).toHaveAttribute("id", "username");
      expect(inputs[2]).toHaveAttribute("type", "password");
      expect(inputs[2]).toHaveAttribute("id", "password");
    });

    test("OnChange is called when input is changed", () => {
      render(
        <SignForm type={{ formType: "register", setFormType: () => {} }} />
      );

      const inputs = screen.queryAllByDisplayValue("");
      fireEvent.change(inputs[0], { target: { value: "email" } });
      expect(inputs[0]).toHaveValue("email");
      fireEvent.change(inputs[1], { target: { value: "username" } });
      expect(inputs[1]).toHaveValue("username");
      fireEvent.change(inputs[2], { target: { value: "password" } });
      expect(inputs[2]).toHaveValue("password");
    });

    test("When all values are entered form can be submitted", async () => {
      const setState = jest.fn();
      const useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation(((initialState: "login" | "register") => [
        initialState,
        setState,
      ]) as unknown as (() => [unknown, Dispatch<unknown>]) | undefined);
      render(
        <SignForm
          type={{
            formType: "register",
            setFormType: setState as (type: "login" | "register") => void,
          }}
        />
      );
      const inputs = screen.queryAllByDisplayValue("");

      fireEvent.change(inputs[0], { target: { value: "email" } });
      expect(inputs[0]).toHaveValue("email");
      fireEvent.change(inputs[1], { target: { value: "username" } });
      expect(inputs[1]).toHaveValue("username");
      fireEvent.change(inputs[2], { target: { value: "password" } });

      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();

      fireEvent.click(button);
      await waitFor(() => expect(setState).toHaveBeenCalledWith("login"));
    });

    test("When not all values are entered button is disabled", async () => {
      const setState = jest.fn();
      const useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation(((initialState: "register" | "login") => [
        initialState,
        setState,
      ]) as unknown as (() => [unknown, Dispatch<unknown>]) | undefined);
      render(
        <SignForm
          type={{
            formType: "register",
            setFormType: setState as (type: "login" | "register") => void,
          }}
        />
      );

      const inputs = screen.getAllByRole("textbox");
      fireEvent.change(inputs[0], { target: { value: "email" } });

      expect(screen.getByRole("button")).toHaveClass("disabled");
      expect(screen.getByRole("button")).toBeDisabled();
      await waitFor(() => expect(setState).not.toHaveBeenCalled());
    });
  });

  describe("Testing form type login", () => {
    test("Should render login form on type login", () => {
      render(<SignForm type={{ formType: "login", setFormType: () => {} }} />);

      expect(screen.getByRole("heading")).toHaveTextContent("Welcome back!");
      expect(screen.getByRole("button")).toHaveTextContent("Login");
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("Should have username and password inputs", () => {
      render(<SignForm type={{ formType: "login", setFormType: () => {} }} />);
      const inputs = screen.queryAllByDisplayValue("");

      expect(inputs[0]).toHaveAttribute("type", "text");
      expect(inputs[0]).toHaveAttribute("id", "username");

      expect(inputs[1]).toHaveAttribute("type", "password");
      expect(inputs[1]).toHaveAttribute("id", "password");
    });
    // TODO: fix this
    // test("OnSubmit login function should be called", async () => {
    //   const loginUserSpy = jest.spyOn(api, "loginUser").mockResolvedValue({
    //     user: {
    //       user_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
    //       username: "tolv",
    //     },
    //     token:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYzQyNmM0NC03NWQ3LTQ2ZmUtOTlmOS0xMDc5M2VkMWFkYmIiLCJ1c2VybmFtZSI6InRvbHYiLCJpYXQiOjE2NjcyNjA2NzAsImV4cCI6MTY2NzI2Nzg3MCwic3ViIjoiYmM0MjZjNDQtNzVkNy00NmZlLTk5ZjktMTA3OTNlZDFhZGJiIn0.pfZvIlBPvC30QoOUHQG3MkKP1_HFHpa7QFqaK--1yU8",
    //   };
    //   // eslint-disable-next-line @typescript-eslint/no-empty-function
    //   render(<SignForm type={{ formType: "login", setFormType: () => {} }} />);
    //   const inputs = screen.queryAllByDisplayValue("");
    //   fireEvent.change(inputs[0], { target: { value: "email" } });
    //   fireEvent.change(inputs[1], { target: { value: "password" } });
    //   const button = screen.getByRole("button");
    //   expect(button).not.toBeDisabled();

    //   fireEvent.click(button);
    //   expect(loginUserSpy).toHaveBeenCalled();
    //   expect(loginUserSpy).toHaveBeenCalledWith("email", "password");
    // });
  });
});
