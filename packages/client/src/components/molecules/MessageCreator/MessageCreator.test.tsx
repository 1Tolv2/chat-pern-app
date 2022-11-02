import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MessageCreator from ".";

const testChannelItem = {
  id: "89bc123e-7e63-41dc-9b7f-b4412c20afe3",
  name: "general",
  description: "General chat",
  server_id: "4b2f5de9-e898-4e33-aa42-53430995614f",
  created_at: new Date(1667252156928),
  updated_at: null,
  posts: [],
};

describe("Test MessageCreator", () => {
  test("Should render textarea", () => {
    render(<MessageCreator activeChannel={testChannelItem} />);
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveAttribute("placeholder", "Message...");
  });
  test("OnChange is called when input is changed", () => {
    render(<MessageCreator activeChannel={testChannelItem} />);
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "test message" } });
    expect(textArea).toHaveValue("test message");
  });
  test("OnSubmit is called when form is submitted", () => {
    const onSubmit = jest.fn();
    render(
      <MessageCreator
        activeChannel={testChannelItem}
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
        activeChannel={testChannelItem}
        socket={{ emit: onSubmit } as any}
      />
    );
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "" } });
    fireEvent.submit(screen.getByTitle("submit"));
    expect(onSubmit).not.toBeCalled();
  });
});
