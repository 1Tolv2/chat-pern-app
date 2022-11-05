import { Request, Response } from "express";
import * as Channel from "../../models/Channel";
import * as channels from "../channels";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  };
});

const mockChannel = {
  id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
  name: "general",
  description: "General chat",
  server_id: "c89241e1-a78d-4b87-9955-1bd4a73524a3",
  created_at: 1667467090807,
  updated_at: null,
};

jest.mock("../../models/Channel", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Channel"),
    createChannel: () => Promise.resolve(mockChannel),
    findAllChannels: () => Promise.resolve([mockChannel]),
    findChannelById: () => Promise.resolve(mockChannel),
  };
});

jest.mock("../../models/Post", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Post"),
    findAllPostsByChannel: () => Promise.resolve([]),
  };
});

describe("Testing channel controllers", () => {
  describe("When creating a channel", () => {
    test("Should call .status() with 201 and .json() with the channel and a message", async () => {
      mockRequest.body = {
        name: "general",
        description: "General chat",
        server_id: "c89241e1-a78d-4b87-9955-1bd4a73524a3",
      };

      await channels.handleNewChannel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        channel: mockChannel,
        message: expect.any(String),
      });
    });

    test("Should call .status() with 400 and .json() with an array of fields when missing required fields", async () => {
      mockRequest.body = {
        description: "Hello World",
      };

      await channels.handleNewChannel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Missing required fields",
        missingFields: ["name", "server_id"],
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      jest.spyOn(Channel, "createChannel").mockImplementation(() => {
        throw new Error("Some error");
      });
      mockRequest.body = {
        name: "general",
        description: "General chat",
        server_id: "c89241e1-a78d-4b87-9955-1bd4a73524a3",
      };

      await channels.handleNewChannel(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({
        error: expect.any(String),
      });
    });

    describe("When getting all channels", () => {
      test("Should return .json() with array of channels", async () => {
        await channels.getAllChannels(
          mockRequest as Request,
          mockResponse as Response
        );
        expect(mockResponse.json).toHaveBeenCalledWith([mockChannel]);
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      jest.spyOn(Channel, "findAllChannels").mockImplementation(() => {
        throw new Error("Some error");
      });

      await channels.getAllChannels(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({
        error: expect.any(String),
      });
    });
  });

  describe("When getting a channel by id", () => {
    test("Should return a specific channel", async () => {
      mockRequest.params = {
        id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
      };

      await channels.getChannelById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        ...mockChannel,
        posts: [],
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      jest.spyOn(Channel, "findChannelById").mockImplementation(() => {
        throw new Error("Error getting channels");
      });

      await channels.getChannelById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });
});
