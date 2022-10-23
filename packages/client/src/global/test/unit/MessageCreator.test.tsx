import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MessageCreator from "../../../components/molecules/MessageCreator";

const testServerItem = {
  channel_id: 1,
  name: "test channel",
  description: "this is a test channel",
  posts: [],
  server_id: 1,
};

describe("Test MessageCreator", () => {
  test("Should render textarea", () => {
    render(<MessageCreator activeChannel={testServerItem} />);
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("placeholder", "Message...");
  });
  test("OnChange is called when input is changed", () => {
    render(<MessageCreator activeChannel={testServerItem} />);
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "test message" } });
    expect(textArea).toHaveValue("test message");
  });
  test("OnSubmit is called when form is submitted", () => {
    const onSubmit = jest.fn();
    render(
      <MessageCreator
        activeChannel={testServerItem}
        socket={{ emit: onSubmit } as any}
      />
    );
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "submitted message" } });
    fireEvent.submit(screen.getByTitle("submit"));
    expect(onSubmit).toBeCalled();
  });
  test("OnSubmit is not called when message is empty", () => {
    const onSubmit = jest.fn();
    render(
      <MessageCreator
        activeChannel={testServerItem}
        socket={{ emit: onSubmit } as any}
      />
    );
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "" } });
    fireEvent.submit(screen.getByTitle("submit"));
    expect(onSubmit).not.toBeCalled();
  });
});
