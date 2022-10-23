import React from "react";
import { render, screen } from "@testing-library/react";
import MessageItem from "../../../components/molecules/MessageItem";
import { PostItem } from "@chat-app-typescript/shared";

const testPostItem: PostItem = {
  id: 1,
  text: "test",
  user: "test user",
  user_id: 1,
  channel_id: 1,
  created_at: new Date("10/23/2022"),
};

describe("Testing MessageItem", () => {
  test("should render a listitem", () => {
    render(<MessageItem data={testPostItem} />);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });
  test("Should render users first letter as uppercase", () => {
    render(<MessageItem data={testPostItem} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Test user");
  });
  test("Should render date properly formated", () => {
    render(<MessageItem data={testPostItem} />);
    expect(screen.getByText("23/10/2022 - 00.00")).toBeInTheDocument();
  });
});
