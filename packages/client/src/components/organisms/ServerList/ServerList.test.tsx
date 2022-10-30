import React, { Dispatch } from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import ServerList from ".";
import { ServerItem, UserItem } from "@chat-app-typescript/shared";
import * as api from "../../../global/api";

const mockUser: UserItem = {
  id: 1,
  email: "tolv@test.com",
  username: "tolv",
  servers: [
    {
      user_id: 1,
      role: "admin",
      id: 1,
      name: "tolv's server",
      description: "Hello World!",
    },
    {
      user_id: 1,
      role: "member",
      id: 3,
      name: "test's server",
      description: "Hello World!",
    },
  ],
  posts: [],
};

const mockActiveServer: ServerItem = {
  user_id: 1,
  role: "admin",
  id: 1,
  name: "tolv's server",
  description: "Hello World!",
};

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation(((initialState: any) => [
  initialState,
  setState,
]) as unknown as (() => [unknown, Dispatch<unknown>]) | undefined);

jest.mock("../../../global/api", () => {
  const mockServers: ServerItem[] = [
    {
      user_id: 1,
      role: "admin",
      id: 1,
      name: "tolv's server",
      description: "Hello World!",
    },
    {
      user_id: 1,
      role: "member",
      id: 3,
      name: "ey's server",
      description: "Hello World!",
    },
  ];
  return {
    __esModule: true,
    ...jest.requireActual("../../../global/api"),
    getServers: () => Promise.resolve(mockServers),
    getServer: () => Promise.resolve(mockServers[1]),
  };
});

describe("Testing ServerList", () => {
  test("Should render list", async () => {
    render(
      <ServerList
        user={mockUser}
        states={{ activeServer: mockActiveServer, setActiveServer: setState }}
      />
    );
    expect(await screen.findByRole("list")).toBeInTheDocument();
  });

  test("Should render server list items", async () => {
    render(
      <ServerList
        user={mockUser}
        states={{ activeServer: mockActiveServer, setActiveServer: setState }}
      />
    );
    expect(await screen.findByText("Ts")).toBeInTheDocument();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  test("Should render one item as active", async () => {
    render(
      <ServerList
        user={mockUser}
        states={{ activeServer: mockActiveServer, setActiveServer: setState }}
      />
    );

    await screen.findByText("Ts");
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems[0]).not.toHaveAttribute("id", "active");
    expect(listItems[1]).toHaveAttribute("id", "active");
    expect(listItems[2]).not.toHaveAttribute("id", "active");
  });

  test("OnClick should change active server/ call handleOnClick", async () => {
    const getServerSpy = jest.spyOn(api, "getServer").mockResolvedValue({
      user_id: 1,
      role: "member",
      id: 3,
      name: "ey's server",
      description: "Hello World!",
    });
    render(
      <ServerList
        user={mockUser}
        states={{ activeServer: mockActiveServer, setActiveServer: setState }}
      />
    );
    const target = await screen.findByTestId("channel_3");
    fireEvent.click(target);
    await waitFor(() => expect(getServerSpy).toHaveBeenCalledWith("3"));
    await waitFor(() =>
      expect(setState).toHaveBeenCalledWith({
        user_id: 1,
        role: "member",
        id: 3,
        name: "ey's server",
        description: "Hello World!",
      })
    );
  });
});
