import React, { Dispatch } from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import ChannelList from ".";
import { ChannelItem, ServerItem } from "@chat-app-typescript/shared";
import * as api from "../../../global/api";

const mockActiveServer: ServerItem = {
  user_id: 1,
  role: "admin",
  id: 1,
  name: "tolv's server",
  description: "Hello World!",
};

const mockActiveChannel: ChannelItem = {
  id: 10,
  server_id: 1,
  name: "general",
  description: "",
};

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation(((initialState: any) => [
  initialState,
  setState,
]) as unknown as (() => [unknown, Dispatch<unknown>]) | undefined);

jest.mock("../../../global/api", () => {
  const mockChannel = {
    id: 10,
    server_id: 1,
    name: "general",
    description: "",
  };
  const mockServerWithChannels: ServerItem = {
    id: 1,
    name: "tolv's server",
    description: "Hello World!",
    created_at: new Date(1666606917837),
    updated_at: null,
    channels: [
      {
        id: 10,
        server_id: 1,
        name: "general",
        description: "",
      },
      {
        id: 11,
        server_id: 1,
        name: "second-server",
        description: "",
      },
      {
        id: 14,
        server_id: 1,
        name: "min-andra-kanal",
        description: "",
      },
    ],
  };
  return {
    __esModule: true,
    ...jest.requireActual("../../../global/api"),
    getServer: () => Promise.resolve(mockServerWithChannels),
  };
});

describe("Testing ChannelList", () => {
  describe("View for all roles", () => {
    test("Should render list", async () => {
      render(
        <ChannelList
          states={{
            activeServer: mockActiveServer,
            activeChannel: mockActiveChannel,
            setActiveChannel: setState,
          }}
          isAdmin={false}
        />
      );
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      await waitFor(() =>
        expect(setState).toHaveBeenCalledWith({
          description: "",
          id: 10,
          name: "general",
          server_id: 1,
        })
      );
    });
    test("Should render list items with channel names and one active item", async () => {
      render(
        <ChannelList
          states={{
            activeServer: mockActiveServer,
            activeChannel: mockActiveChannel,
            setActiveChannel: setState,
          }}
          isAdmin={false}
        />
      );
      expect(await screen.findAllByRole("listitem")).toHaveLength(3);
      expect(await screen.findByText("general")).toHaveClass("active");
    });

    test("OnClick should call handleOnClick", async () => {
        const getServerSpy = jest.spyOn(api, "getServer").mockResolvedValue({
            id: 1,
            name: "tolv's server",
            description: "Hello World!",
            created_at: new Date(1666606917837),
            updated_at: null,
            channels: [
              {
                id: 10,
                server_id: 1,
                name: "general",
                description: "",
              },
              {
                id: 11,
                server_id: 1,
                name: "second-server",
                description: "",
              },
              {
                id: 14,
                server_id: 1,
                name: "min-andra-kanal",
                description: "",
              },
            ],
          });
        render(
          <ChannelList
            states={{
              activeServer: mockActiveServer,
              activeChannel: mockActiveChannel,
              setActiveChannel: setState,
            }}
            isAdmin={false}
          />
        );
        const target = await screen.findByText("min-andra-kanal");
        fireEvent.click(target);
        await waitFor(() => expect(setState).toHaveBeenCalledWith({"description": "", "id": 14, "name": "min-andra-kanal", "server_id": 1}));
        await waitFor(() => expect(getServerSpy).toHaveBeenCalledWith(1));

      });
  });
});
