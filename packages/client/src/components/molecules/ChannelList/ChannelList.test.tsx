import React, { Dispatch } from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import ChannelList from ".";
import { ChannelItem, ServerItem } from "@chat-app-typescript/shared";
import * as api from "../../../global/api";

const mockActiveServer: ServerItem = {
  id: "4b2f5de9-e898-4e33-aa42-53430995614f",
  name: "tolv's server",
  description: "Hello World",
  admin_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
  created_at: new Date(1667252156912),
  updated_at: null,
  channels: [],
  members: [],
};

const mockActiveChannel: ChannelItem = {
  id: "89bc123e-7e63-41dc-9b7f-b4412c20afe3",
  name: "general",
  description: "General chat",
  created_at: new Date(1667252156928),
  updated_at: null,
};

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState");
useStateSpy.mockImplementation(((initialState: ChannelItem) => [
  initialState,
  setState,
]) as unknown as (() => [unknown, Dispatch<unknown>]) | undefined);

jest.mock("../../../global/api", () => {
  const mockServerWithChannels: ServerItem = {
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
    ],
    members: [],
  };
  return {
    __esModule: true,
    ...jest.requireActual("../../../global/api"),
    getServer: () => Promise.resolve(mockServerWithChannels),
  };
});

describe("Testing ChannelList", () => {
  describe("When logged in as member", () => {
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
          id: "89bc123e-7e63-41dc-9b7f-b4412c20afe3",
          name: "general",
          description: "General chat",
          created_at: new Date(1667252156912),
          updated_at: null,
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
      expect(await screen.findAllByRole("listitem")).toHaveLength(2);
      expect(await screen.findByText("general")).toHaveClass("active");
    });

    test("OnClick should call handleOnClick", async () => {
      const getServerSpy = jest.spyOn(api, "getServer").mockResolvedValue({
        id: "4b2f5de9-e898-4e33-aa42-53430995614f",
        name: "tolv's server",
        description: "Hello World",
        admin_id: "",
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
        ],
        members: [],
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
      const target = await screen.findByText("secondchannel");
      fireEvent.click(target);
      await waitFor(() =>
        expect(setState).toHaveBeenCalledWith({
          id: "c2e897f3-7401-4014-bf69-3c16787cd368",
          name: "secondchannel",
          description: "",
          created_at: new Date(1667252156912),
          updated_at: null,
        })
      );
      await waitFor(() =>
        expect(getServerSpy).toHaveBeenCalledWith(
          "4b2f5de9-e898-4e33-aa42-53430995614f"
        )
      );
    });
  });
});
