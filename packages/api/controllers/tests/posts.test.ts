import { Request, Response } from "express";
import * as Post from "../../models/Post";
import * as posts from "../posts";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  };
});

const mockPost = {
  id: "c7e1a801-1ba1-49e2-a7c7-bb77f70b8a76",
  text: "Hello World!",
  username: "test",
  user_id: "f4b9569b-76ea-49c0-ad55-a7f6c6213cf6",
  channel_id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
  created_at: 1667644242731,
  updated_at: null,
};

jest.mock("../../models/Post", () => {
  const mockPost = {
    id: "c7e1a801-1ba1-49e2-a7c7-bb77f70b8a76",
    text: "Hello World!",
    username: "test",
    user_id: "f4b9569b-76ea-49c0-ad55-a7f6c6213cf6",
    channel_id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
    created_at: 1667644242731,
    updated_at: null,
  };
  return {
    __esModule: true,
    ...jest.requireActual("../../models/Post"),
    createPost: () => Promise.resolve(mockPost),
    findAllPosts: () =>
      Promise.resolve([
        {
          id: "36d4cf7e-eb70-4951-bb19-d05f83203f56",
          text: "Hello World2!",
          user: "test",
          user_id: "f4b9569b-76ea-49c0-ad55-a7f6c6213cf6",
          channel_name: "general",
          channel_id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
          created_at: 1667644528349,
          updated_at: null,
        },
        mockPost,
      ]),
    findPostById: () => Promise.resolve(mockPost),
  };
});

describe("Testing post controllers", () => {
  describe("When creating a post", () => {
    test("Should call .status() with 201 and .json() with the post and a message", async () => {
      mockRequest.body = {
        text: "Hello World2!",
        channel_id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
      };

      await posts.handleNewPost(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        post: mockPost,
        message: "New post created",
      });
    });

    test("Should call .status() with 400 and .json() with an array of fields when missing required fields", async () => {
      mockRequest.body = {
        text: "Hello World",
      };

      await posts.handleNewPost(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Missing required fields",
        missingFields: ["channel_id"],
      });
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      jest.spyOn(Post, "createPost").mockImplementation(() => {
        throw new Error("Error creating post");
      });

      mockRequest.body = {
        text: "Hello World2!",
        channel_id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
      };

      await posts.handleNewPost(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });
  });

  describe("When getting all posts", () => {
    test("Should call .json() with array of posts", async () => {
      await posts.getAllPosts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith([
        {
          id: "36d4cf7e-eb70-4951-bb19-d05f83203f56",
          text: "Hello World2!",
          user: "test",
          user_id: "f4b9569b-76ea-49c0-ad55-a7f6c6213cf6",
          channel_name: "general",
          channel_id: "df86d469-e1fb-4a51-81d4-3031ec8ffe4f",
          created_at: 1667644528349,
          updated_at: null,
        },
        mockPost,
      ]);
    });

    test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
      jest.spyOn(Post, "findAllPosts").mockImplementation(() => {
        throw new Error("Error getting posts");
      });

      await posts.getAllPosts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: expect.any(String),
      });
    });

    describe("When getting a post by id", () => {
      test("Should return a specific post", async () => {
        mockRequest.params = {
          id: "c7e1a801-1ba1-49e2-a7c7-bb77f70b8a76",
        };

        await posts.getPostById(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.json).toHaveBeenCalledWith(mockPost);
      });

      test("Should call .status() with 500 and .json() with an error message when a non specific error is thrown", async () => {
        jest.spyOn(Post, "findAllPosts").mockImplementation(() => {
          throw new Error("Error getting posts");
        });

        await posts.getPostById(
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
});
