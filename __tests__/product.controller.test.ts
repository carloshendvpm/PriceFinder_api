import { Request, Response } from "express";
import ProductController from "../src/controllers/product.controller";
import ProductService from "../src/repositories/product.repository";

jest.mock("../src/repositories/product.repository", () => ({
  createProduct: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn()
}));

describe("ProductController", () => {
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
    it("should create a new product", async () => {
      req.body = { name: "Product 1", description: "Product description" };
      const createdProduct = { id: 1, name: "Product 1", description: "Product description" };
      (ProductService.createProduct as jest.Mock).mockResolvedValue(createdProduct);

      await ProductController.create(req, res);

      expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(createdProduct);
    });

    it("should handle errors during creation", async () => {
      req.body = { name: "Product 1", description: "Product description" };
      const error = new Error("Create error");
      (ProductService.createProduct as jest.Mock).mockRejectedValue(error);

      await ProductController.create(req, res);

      expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});