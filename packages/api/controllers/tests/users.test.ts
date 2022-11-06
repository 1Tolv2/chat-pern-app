import { Request, Response } from "express";
import { UniqueIntegrityConstraintViolationError } from "slonik";
import { UserItem } from "@chat-app-typescript/shared";
import * as User from "../../models/User";
import responseMessages from "../../global/responseMessages";
import * as users from "../users";

const { oops, missingReqFields, notUnique } = responseMessages.errorResponse;

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    json: jest.fn(),
    sendStatus: jest.fn(),
    status: jest.fn(),
  };
});

jest.mock("../../models/User", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/User"),
    createUser: () => Promise.resolve(),
    findAllUsers: () =>
      Promise.resolve([
        {
          id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
          username: "tolv",
          email: "test@test.com",
          created_at: 1667252156899,
          updated_at: null,
        },
        {
          id: "962a2c68-86c2-4893-9b40-ce593130daac",
          username: "test",
          email: "test@test.com",
          created_at: 1667256731144,
          updated_at: null,
        },
      ]),
    findUserById: () =>
      Promise.resolve({
        id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
        username: "tolv",
        email: "test@test.com",
        created_at: 1667252156899,
        updated_at: null,
      }),
  };
});

jest.mock("../../models/Server", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Server"),
    findAllUsersServers: () =>
      Promise.resolve([
        {
          user_id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
          id: "4b2f5de9-e898-4e33-aa42-53430995614f",
          name: "tolv's server",
          description: "Hello World",
          role: "admin",
        },
        {
          user_id: "962a2c68-86c2-4893-9b40-ce593130daac",
          id: "a5164f87-debb-4ebe-bd5d-a83d3d112643",
          name: "test's server",
          description: "Hello World",
          role: "admin",
        },
      ]),
    findUserServers: () =>
      Promise.resolve([
        {
          id: "4b2f5de9-e898-4e33-aa42-53430995614f",
          name: "tolv's server",
          description: "Hello World",
          role: "admin",
        },
      ]),
  };
});

describe("Testing user controllers", () => {
  describe("When creating a user", () => {
    test("Should call .sendStatus() with status 201 when providing all fields", async () => {
      mockRequest.body = {
        username: "Tolv",
        email: "test@test.com",
        password: "test",
      };
      mockResponse.sendStatus = jest.fn();

      await users.handleNewUser(
        mockRequest as Request<Partial<UserItem>>,
        mockResponse as Response
      );

      expect(mockResponse.sendStatus).toBeCalled();
      expect(mockResponse.sendStatus).toBeCalledWith(201);
    });

    test("Should call .status() with 400 and .json() with an array of fields when missing required fields", async () => {
      mockRequest.body = {
        username: "Tolv",
        email: "test@test.com",
      };
      mockResponse.status = jest.fn();
      mockResponse.json = jest.fn();

      await users.handleNewUser(
        mockRequest as Request<Partial<UserItem>>,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(missingReqFields.status);
      expect(mockResponse.json).toBeCalledWith({
        error: missingReqFields.message,
        missingFields: ["password"],
      });
    });

    test("Should call .status() with 409 and .json() with an error message when sending in username that already exists", async () => {
      const mockErrorMessage = "Username or email already exists";
      jest.spyOn(User, "createUser").mockImplementation(() => {
        throw new UniqueIntegrityConstraintViolationError(
          new Error(mockErrorMessage),
          "username"
        );
      });

      mockRequest.body = {
        username: "Tolv",
        email: "test@test.com",
        password: "test",
      };
      mockResponse.status = jest.fn();
      mockResponse.json = jest.fn();

      await users.handleNewUser(
        mockRequest as Request<Partial<UserItem>>,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(notUnique.status);
      expect(mockResponse.json).toBeCalledWith({
        error: "Username or email " + notUnique.message,
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      const mockErrorMessage = "My test error message";
      jest.spyOn(User, "createUser").mockImplementation(() => {
        throw new Error(mockErrorMessage);
      });

      mockRequest.body = {
        username: "Tolv",
        email: "test@test.com",
        password: "test",
      };
      mockResponse.status = jest.fn();
      mockResponse.json = jest.fn();

      await users.handleNewUser(
        mockRequest as Request<Partial<UserItem>>,
        mockResponse as Response
      );

      expect(mockResponse.status).toBeCalledWith(oops.status);
      expect(mockResponse.json).toBeCalledWith({ error: oops.message });
    });
  });

  describe("When getting all users", () => {
    test("Should call .json() with an array of users", async () => {
      await users.getAllUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toBeCalledWith([
        {
          id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
          username: "tolv",
          email: "test@test.com",
          created_at: 1667252156899,
          updated_at: null,
          servers: [
            {
              id: "4b2f5de9-e898-4e33-aa42-53430995614f",
              name: "tolv's server",
              description: "Hello World",
              role: "admin",
            },
          ],
        },
        {
          id: "962a2c68-86c2-4893-9b40-ce593130daac",
          username: "test",
          email: "test@test.com",
          created_at: 1667256731144,
          updated_at: null,
          servers: [
            {
              id: "a5164f87-debb-4ebe-bd5d-a83d3d112643",
              name: "test's server",
              description: "Hello World",
              role: "admin",
            },
          ],
        },
      ]);
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      const mockErrorMessage = "My test error message";
      jest.spyOn(User, "findAllUsers").mockImplementation(() => {
        throw new Error(mockErrorMessage);
      });

      mockResponse.status = jest.fn();
      mockResponse.json = jest.fn();

      await users.getAllUsers(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toBeCalledWith(oops.status);
      expect(mockResponse.json).toBeCalledWith({ error: oops.message });
    });
  });

  describe("When getting user", () => {
    test("Should call .json() with user", async () => {
      await users.getUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toBeCalledWith({
        id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
        username: "tolv",
        email: "test@test.com",
        created_at: 1667252156899,
        updated_at: null,
        servers: [
          {
            id: "4b2f5de9-e898-4e33-aa42-53430995614f",
            name: "tolv's server",
            description: "Hello World",
            role: "admin",
          },
        ],
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      const mockErrorMessage = "My test error message";
      jest.spyOn(User, "findUserById").mockImplementation(() => {
        throw new Error(mockErrorMessage);
      });

      mockResponse.status = jest.fn();
      mockResponse.json = jest.fn();

      await users.getUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toBeCalledWith(oops.status);
      expect(mockResponse.json).toBeCalledWith({ error: oops.message });
    });
  });
});
