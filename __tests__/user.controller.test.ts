import { Request, Response } from "express";
import UserController from "../src/controllers/user.controller";
import UserService from "../src/repositories/user.repository";
import { userValidation } from "../src/validations/user.validation";
import bcrypt from "bcrypt";

jest.mock("../src/repositories/user.repository");
jest.mock("../src/validations/user.validation");
jest.mock("bcrypt");

describe("UserController", () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.send = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };
      const hashedPassword = "hashedPassword123";
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (userValidation.validate as jest.Mock).mockResolvedValue(undefined);
      (UserService.createUser as jest.Mock).mockResolvedValue(userData);

      req.body = userData;

      // Act
      await UserController.create(req, res);

      // Assert
      expect(userValidation.validate).toHaveBeenCalledWith(req.body);
      (bcrypt.hash as jest.Mock).mockImplementation((data, salt) => {
        return Promise.resolve(`hashed${data}${salt}`);
      });
      expect(UserService.createUser).toHaveBeenCalledWith({
        ...req.body,
        password: hashedPassword,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(userData);
    });

    it("should handle errors during creation", async () => {
      // Arrange
      const error = new Error("Create error");
      (userValidation.validate as jest.Mock).mockRejectedValue(error);

      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      // Act
      await UserController.create(req, res);

      // Assert
      expect(userValidation.validate).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });

    it("should handle missing or invalid request body", async () => {
      // Arrange
      const error = new Error("Invalid request body");
      (userValidation.validate as jest.Mock).mockRejectedValue(error);

      req.body = {}; // Empty body

      // Act
      await UserController.create(req, res);

      // Assert
      expect(userValidation.validate).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("get", () => {
    it("should get all users", async () => {
      // Arrange
      const users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
      ];
      (UserService.getAll as jest.Mock).mockResolvedValue(users);

      // Act
      await UserController.get(req, res);

      // Assert
      expect(UserService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(users);
    });

    it("should handle errors during get", async () => {
      // Arrange
      const error = new Error("Get error");
      (UserService.getAll as jest.Mock).mockRejectedValue(error);

      // Act
      await UserController.get(req, res);

      // Assert
      expect(UserService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getById", () => {
    it("should get user by ID", async () => {
      // Arrange
      const userId = 1;
      const user = { id: userId, name: "John Doe", email: "john@example.com" };
      (UserService.getById as jest.Mock).mockResolvedValue(user);
      req.params = { id: userId.toString() };

      // Act
      await UserController.getById(req, res);

      // Assert
      expect(UserService.getById).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(user);
    });

    it("should handle errors during getById", async () => {
      // Arrange
      const userId = 1;
      const error = new Error("GetById error");
      (UserService.getById as jest.Mock).mockRejectedValue(error);
      req.params = { id: userId.toString() };

      // Act
      await UserController.getById(req, res);

      // Assert
      expect(UserService.getById).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      // Arrange
      const userId = 1;
      const updatedUser = { name: "Jane Doe", email: "jane@example.com" };
      const user = { id: userId, ...updatedUser };
      (UserService.updateUser as jest.Mock).mockResolvedValue(user);
      req.params = { id: userId.toString() };
      req.body = updatedUser;

      // Act
      await UserController.update(req, res);

      // Assert
      expect(UserService.updateUser).toHaveBeenCalledWith(userId, updatedUser);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(user);
    });

    it("should handle errors during update", async () => {
      // Arrange
      const userId = 1;
      const updatedUser = { name: "Jane Doe", email: "jane@example.com" };
      const error = new Error("Update error");
      (UserService.updateUser as jest.Mock).mockRejectedValue(error);
      req.params = { id: userId.toString() };
      req.body = updatedUser;

      // Act
      await UserController.update(req, res);

      // Assert
      expect(UserService.updateUser).toHaveBeenCalledWith(userId, updatedUser);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("remove", () => {
    it("should remove a user", async () => {
      // Arrange
      const userId = 1;
      req.params = { id: userId.toString() };

      // Act
      await UserController.remove(req, res);

      // Assert
      expect(UserService.deleteUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith();
    });

    it("should handle errors during remove", async () => {
      // Arrange
      const userId = 1;
      const error = new Error("Remove error");
      (UserService.deleteUser as jest.Mock).mockRejectedValue(error);
      req.params = { id: userId.toString() };

      // Act
      await UserController.remove(req, res);

      // Assert
      expect(UserService.deleteUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});