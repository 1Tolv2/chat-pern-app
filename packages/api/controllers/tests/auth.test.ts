import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import * as auth from "../auth";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let mockNext: NextFunction;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
    cookie: jest.fn(),
  };
  mockNext = jest.fn();
});

jest.mock("../../models/User", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../models/User"),
    findUserById: () =>
      Promise.resolve({
        id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
        username: "tolv",
        email: "",
      }),
  };
});

describe("Testing auth controllers", () => {
  describe("Handling Login", () => {
    test("Should call .cookie() with token and .json() with user information", async () => {
      User.authorizeUser = jest.fn().mockResolvedValue({
        id: "f4b9569b-76ea-49c0-ad55-a7f6c6213cf6",
        username: "test",
        email: "test@test.com",
        created_at: 1667644130914,
        updated_at: null,
      });
      jest.spyOn(jwt, "sign").mockImplementation(() => "token");

      mockRequest.body = {
        username: "Tolv",
        password: "1234",
      };

      await auth.logInUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.cookie).toHaveBeenCalledWith("jwt", "token", {
        maxAge: 7200000,
        httpOnly: true,
      });
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: expect.any(String),
        username: "tolv",
      });
    });

    test("Should call .status() with 400 and .json() with an array of fields when missing required fields", async () => {
      mockRequest.body = {
        username: "Tolv",
      };

      await auth.logInUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Missing required fields",
        missingFields: ["password"],
      });
    });
  });

  describe("Handling token", () => {
    test("Should set req.user() with a token", async () => {
      jest.spyOn(jwt, "verify").mockImplementation(() => "token");

      mockRequest.cookies = { jwt: "fakeToken" };

      await auth.handleToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockRequest.user).toEqual("token");
      expect(mockNext).toHaveBeenCalled();
    });

    test("Should call .status() with 401 and .json() with an error message when authorizing with an invalid token", async () => {
      jest.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error("invalid token");
      });

      mockRequest.cookies = { jwt: "fakeToken" };

      await auth.handleToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid token",
      });
    });
  });
});
