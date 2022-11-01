import React, { Dispatch } from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import ServerList from ".";
import { ServerItem, UserItem } from "@chat-app-typescript/shared";
import * as api from "../../../global/api";

const mockUser: UserItem = {
  id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
  username: "tolv",
  email: "test@test.com",
  created_at: new Date(1667252156899),
  updated_at: null,
  servers: [
    {
      role: "admin",
      id: "4b2f5de9-e898-4e33-aa42-53430995614f",
      name: "tolv's server",
      description: "Hello World",
    },
  ],
};

const mockActiveServer: ServerItem = {
  id: "4b2f5de9-e898-4e33-aa42-53430995614f",
  name: "tolv's server",
  description: "Hello World",
  admin_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
  created_at: new Date(1667252156912),
  updated_at: null,
  channels: [
    {
      id: "89bc123e-7e63-41dc-9b7f-b4412c20afe3",
      name: "general",
      description: "General chat",
      created_at: new Date(1667252156912),
      updated_at: null,
    },
  ],
  members: [],
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
      id: "4b2f5de9-e898-4e33-aa42-53430995614f",
      name: "tolv's server",
      description: "Hello World",
      admin_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
      created_at: new Date(1667252156912),
      updated_at: null,
      channels: [],
      members: [],
    },
    {
      id: "4d0d9c6c-6435-4b0e-95dd-7886c3410928",
      name: "second-server",
      description: "",
      admin_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
      created_at: new Date(1667255729028),
      updated_at: null,
      channels: [],
      members: [],
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
      id: "4b2f5de9-e898-4e33-aa42-53430995614f",
      name: "tolv's server",
      description: "Hello World",
      admin_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
      created_at: new Date(1667252156912),
      updated_at: null,
      channels: [
        {
          id: "89bc123e-7e63-41dc-9b7f-b4412c20afe3",
          name: "general",
          description: "General chat",
          created_at: new Date(1667252156912),
          updated_at: null,
        },
        {
          id: "c2e897f3-7401-4014-bf69-3c16787cd368",
          name: "secondchannel",
          description: "",
          created_at: new Date(1667252156912),
          updated_at: null,
        },
        {
          id: "89bc123e-7e63-55th-9b7f-b4412c20afe3",
          name: "third_channel",
          description: "",
          created_at: new Date(1667252156912),
          updated_at: null,
        },
      ],
      members: [],
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
        channel_id: "89bc123e-7e63-55th-9b7f-b4412c20afe3",
        channel_name: "third_channel",
        description: "",
      })
    );
  });
});
