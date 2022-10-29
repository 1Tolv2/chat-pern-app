import React from "react";
import { screen, render } from "@testing-library/react";
import MessageList from "../../../components/molecules/MessageList";
import { PostItem } from "@chat-app-typescript/shared";

const mockListData: PostItem[] = [
  {
    id: 1,
    user_id: 1,
    user: "test user 1",
    channel_id: 1,
    text: "Hello World!",
    created_at: new Date("2022-10-22T22:00:00.000Z"),
  },
  {
    id: 2,
    user_id: 2,
    user: "test user 2",
    channel_id: 1,
    text: "test",
    created_at: new Date("2022-10-25T22:00:00.000Z"),
  },
];

describe("Testing MessageList", () => {
    
  test("Should render list with list items", () => {
    render(<MessageList data={mockListData} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
  });

  describe("Testing listItems", () => {
    test("Should have formatted heading", async () => {
      render(<MessageList data={mockListData} />);
      const headings = screen.queryAllByRole("heading");
      expect(headings).toHaveLength(2);
      expect(headings[0]).toHaveTextContent("Test user 1");
    });

    test("Should have image with alt text", () => {
      render(<MessageList data={mockListData} />);
      const images = screen.queryAllByRole("img");
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute("alt", "avatar");
      expect(images[0]).toHaveAttribute("src", "logo.svg");
    });

    test("Should have paragraph with text", async () => {
      render(<MessageList data={mockListData} />);
      expect(await screen.findByText("Hello World!")).toBeInTheDocument();
    });

    test("Should render formatted date and time", () => {
        render(<MessageList data={mockListData} />);
        expect(screen.getByText("23/10/2022 - 00.00")).toBeInTheDocument();
    })
  });

  test("Should not render list if data array is empty", () => {
    render(<MessageList data={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
