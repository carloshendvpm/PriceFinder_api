import { Request, Response } from "express";
import AuthController from "../src/controllers/auth.controller";
import { prisma } from "../src/services/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

jest.mock('../src/services/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
    },
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compareSync: jest.fn(),
}));

describe("AuthController", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {
      body: {},
    } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    process.env.TOKEN_KEY = "test";

    (prisma.user.findFirst as jest.Mock).mockReset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate a user", async () => {
    const mockUser = {
      id: 1,
      email: "test@email.com",
      password: "hashedpassword",
      name: "Test User",
    };
    const mockToken = "testtoken";
    req.body = {
      email: mockUser.email,
      password: "testpassword",
    };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    await AuthController.authenticate(req, res);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: mockUser.email } });
    expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ token: mockToken });
  });

  it("should return 401 when password is incorrect", async () => {
    const mockUser = {
      id: 1,
      email: "test@email.com",
      password: "hashedpassword",
      name: "Test User",
    };
    req.body = {
      email: mockUser.email,
      password: "wrongpassword",
    };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

    await AuthController.authenticate(req, res);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: mockUser.email } });
    expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: "Invalid password or email" });
  });

  it("should return 400 when user is not found", async () => {
    req.body = {
      email: "test@email.com",
      password: "testpassword",
    };
    (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

    await AuthController.authenticate(req, res);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "User not found" });
  });
  
  it("should return 400 when email and password are not provided", async () => {
    await AuthController.authenticate(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "Email and password are required" });
  });

  it("should handle errors", async () => {
    const mockError = new Error("Test error");
    req.body = {
      email: "test@email.com",
      password: "testpassword",
    };
    (prisma.user.findFirst as jest.Mock).mockRejectedValue(mockError);

    await AuthController.authenticate(req, res);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { email: req.body.email } });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: mockError });
  });
});
