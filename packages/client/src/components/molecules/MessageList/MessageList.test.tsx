import React from "react";
import { screen, render } from "@testing-library/react";
import MessageList from ".";
import { PostItem } from "@chat-app-typescript/shared";

const mockListData: PostItem[] = [
  {
    id: 1,
    user_id: 1,
    user: "test user 1",
    channel_id: 1,
    text: "Hello World!",
    created_at: new Date(2022, 9, 22, 24, 0),
  },
  {
    id: 2,
    user_id: 2,
    user: "test user 2",
    channel_id: 1,
    text: "test",
    created_at: new Date(2020, 10, 15, 12, 0),
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
      const renderDateString = (date: Date): string => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day < 10 ? "0" + day : day}/${
          month < 9 ? "0" + (month + 1) : month + 1
        }/${year} - ${hours < 10 ? "0" + hours : hours}.${
          minutes < 10 ? "0" + minutes : minutes
        }`;
      };
        render(<MessageList data={mockListData} />);
        const dateItems = screen.queryAllByText(/^(\d{2}\/){2}2022...\d{2}\.\d{2}/)
        expect(dateItems[0]).toHaveTextContent(renderDateString(new Date(2022, 9, 22, 24, 0)));
    })
  });

  test("Should not render list if data array is empty", () => {
    render(<MessageList data={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
