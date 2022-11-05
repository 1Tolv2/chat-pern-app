import { Request, Response } from "express";
import { NotFoundError, UniqueIntegrityConstraintViolationError } from "slonik";
import * as Server from "../../models/Server";
import * as servers from "../servers";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  };
});

const mockServer = {
  id: "af153c15-1688-4e89-b42e-004d430ef497",
  name: "second-server9",
  description: "Hello World!",
  admin_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
  channels: [],
  members: [],
  created_at: "2022-11-03T08:46:58.363Z",
  updated_at: null,
};

jest.mock("../../models/Server", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Server"),
    createServer: () => Promise.resolve(mockServer),
    findAllServers: () => Promise.resolve([mockServer]),
    findServerAdmins: () =>
      Promise.resolve([
        {
          server_id: mockServer.id,
          admin_id: mockServer.admin_id,
        },
      ]),
    findServerById: () => Promise.resolve(mockServer),
    findChannelsByServer: () => Promise.resolve([]),
    findUsersByServerId: () =>
      Promise.resolve([
        {
          id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
          username: "tolv",
          role: "admin",
        },
        {
          id: "bc426c44-75d7-46fe-99f9-10793ed1111",
          username: "Ey",
          role: "memeber",
        },
      ]),
    addToServerUsers: () => Promise.resolve(),
  };
});

jest.mock("../../models/Channel", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Channel"),
    findChannelsByServer: () => Promise.resolve([]),
  };
});
jest.mock("../../models/User", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Channel"),
    findUsersByServerId: () => Promise.resolve([]),
  };
});

describe("Testing server controllers", () => {
  describe("When creating a server", () => {
    test("Should call .status() with 201 and .json() with server object when providing all fields", async () => {
      mockRequest.body = {
        name: "Tolv's server",
        description: "Hello World",
      };

      await servers.handleNewServer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        server: mockServer,
        message: "New server created",
      });
    });

    test("Should call .status() with 400 and .json() with an array of fields when missing required fields", async () => {
      mockRequest.body = {
        description: "Hello World",
      };
      mockResponse.status = jest.fn().mockReturnValue(mockResponse);
      mockResponse.json = jest.fn();

      await servers.handleNewServer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Missing required fields",
        missingFields: ["name"],
      });
    });

    test("Should call .status() with 409 and .json() with an error message when sending in a server name that already exists", async () => {
      jest.spyOn(Server, "createServer").mockImplementation(() => {
        throw new UniqueIntegrityConstraintViolationError(
          new Error("Unique error"),
          "name"
        );
      });

      mockRequest.body = {
        name: "Tolvs server",
        description: "",
      };

      await servers.handleNewServer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(409);
      expect(mockResponse.json).toBeCalledWith({
        error: "A server with that name already exists.",
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      jest.spyOn(Server, "createServer").mockImplementation(() => {
        throw new Error("Some error");
      });

      mockRequest.body = {
        name: "Tolvs server",
        description: "",
      };

      await servers.handleNewServer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toBeCalledWith({
        error: "Something went wrong.",
      });
    });
  });

  describe("When getting all servers", () => {
    test("Should call .json() with an array of servers", async () => {
      mockResponse.json = jest.fn();

      await servers.getAllServers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith([mockServer]);
    });

    test("Should call .status() with 500 and .json() with error message when unspecific error occurs", async () => {
      jest.spyOn(Server, "findAllServers").mockImplementation(() => {
        throw new Error("Some error");
      });

      await servers.getAllServers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Something went wrong.",
      });
    });

    describe("When getting server by id", () => {
      test("Should call .json() with an array of servers", async () => {
        mockRequest.params = { id: mockServer.id };

        await servers.getServerById(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.json).toHaveBeenCalledWith(mockServer);
      });
    });

    test("Should call .status() with 404 and .json() with error message when server is not found", async () => {
      jest.spyOn(Server, "findServerById").mockImplementation(() => {
        throw new NotFoundError();
      });

      mockRequest.params = { id: mockServer.id };

      await servers.getServerById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Server not found",
      });
    });

    test("Should call .status() with 500 and .json() with an error message when unsepcified error occurs", async () => {
      jest.spyOn(Server, "findServerById").mockImplementation(() => {
        throw new Error("Some error");
      });

      mockRequest.params = { id: mockServer.id };

      await servers.getServerById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Something went wrong",
      });
    });

    test("Should call .json() with a member added message", async () => {
      mockRequest.params = { id: mockServer.id };
      mockRequest.body = { user_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb" };

      await servers.addMemberToServer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Member added to server",
      });
    });

    test("Should call .status() with 500 and .json() with an error message when unsepcified error occurs", async () => {
      jest.spyOn(Server, "addToServerUsers").mockImplementation(() => {
        throw new Error("Some error");
      });

      mockRequest.params = { id: mockServer.id };
      mockRequest.body = { user_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb" };

      await servers.addMemberToServer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Something went wrong",
      });
    });
  });
});
