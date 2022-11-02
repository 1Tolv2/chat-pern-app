import request from "supertest";
import { server } from "../../app";
import User from "../../models/User";

const defaultUser = {
  id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
  email: "tolv@test.com",
  username: "tolv",
  password: "lol",
  createdAt: new Date(),
  updatedAt: null,
};
jest.mock("../../models/User", () => {
  const mockUser = {
    id: "bc426c44-75d7-46fe-99f9-10793ed1adbb",
    email: "tolv2@test.com",
    username: "tolv2",
    password: "lol",
    createdAt: new Date(),
    updatedAt: null,
  };
  return {
    __esModule: true,
    ...jest.requireActual("../../models/User"),
    createUser: () => Promise.resolve(),
    findAllUsers: () => Promise.resolve([mockUser, mockUser]),
  };
});

jest.mock("../../models/Server", () => {
  const mockServerUsers = [
    { id: 1, user_id: 1, server_id: 1, role: "admin" },
    { id: 2, user_id: 3, server_id: 2, role: "admin" },
    { id: 3, user_id: 1, server_id: 2, role: "member" },
  ];
  return {
    __esModule: true,
    findServerUsers: () => Promise.resolve(mockServerUsers),
  };
});

describe("GET /users", () => {
  User.authorizeUser = jest.fn().mockReturnValueOnce(defaultUser);
  let token = "";
  beforeAll(async () => {
    const res = await request(server)
      .post("/users/auth")
      .send({ username: "Tolv", email: "tolv@test.com", password: "lol" });
    token = res.body.token;
  });

  test("should return 200 and array of users", () => {
    request(server)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("POST /users", () => {
  test("should return 201", () => {
    request(server)
      .post("/users")
      .send({ username: "Tolv", email: "tolv@test.com", password: "lol" })
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
  test("should return 400 if missing required fields", () => {
    return request(server)
      .post("/users")
      .send({ username: "Tolv" })
      .set("Accept", "application/json")
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
        expect(res.body).toHaveProperty("missingFields");
        expect(res.body.missingFields).toEqual(["email", "password"]);
      });
  });
  describe("/auth", () => {
    test("Should return user object with token", () => {
      User.authorizeUser = jest.fn().mockReturnValueOnce(defaultUser);

      return request(server)
        .post("/users/auth")
        .send({ username: "Tolv", password: "lol" })
        .set("Accept", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty("user");
          expect(res.body.token).toMatch(/^(?:[\w-]*\.){2}[\w-]*$/);
          expect(res.body.user).toHaveProperty("userId");
          expect(res.body.user).toHaveProperty("username");
        });
    });
    test("Should return 400 if missing required fields", () => {
      return request(server)
        .post("/users/auth")
        .send({ username: "Tolv" })
        .set("Accept", "application/json")
        .expect(400)
        .then((res) => {
          expect(res.body).toHaveProperty("error");
          expect(res.body).toHaveProperty("missingFields");
        });
    });
  });
});
