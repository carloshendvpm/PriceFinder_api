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
  describe("get", () => {
    it("should get all products", async () => {
      const products = [
        { id: 1, name: "Product 1", description: "Product description" },
        { id: 2, name: "Product 2", description: "Product description" }
      ];
      (ProductService.getAll as jest.Mock).mockResolvedValue(products);

      await ProductController.get(req, res);

      expect(ProductService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(products);
    });

    it("should handle errors during get", async () => {
      const error = new Error("Get error");
      (ProductService.getAll as jest.Mock).mockRejectedValue(error);

      await ProductController.get(req, res);

      expect(ProductService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getById", () => {
    it("should get product by ID", async () => {
      const productId = 1;
      const product = { id: productId, name: "Product 1", description: "Product description" };
      (ProductService.getById as jest.Mock).mockResolvedValue(product);
      req.params = { id: productId.toString() };

      await ProductController.getById(req, res);

      expect(ProductService.getById).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(product);
    });

    it("should handle errors during getById", async () => {
      const productId = 1;
      const error = new Error("GetById error");
      (ProductService.getById as jest.Mock).mockRejectedValue(error);
      req.params = { id: productId.toString() };

      await ProductController.getById(req, res);

      expect(ProductService.getById).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });

  describe("update", () => {
    it("should update a product", async () => {
      const productId = 1;
      const updatedProduct = { id: productId, name: "Updated Product", description: "Updated description" };
      (ProductService.updateProduct as jest.Mock).mockResolvedValue(updatedProduct);
      req.params = { id: productId.toString() };
      req.body = { name: "Updated Product", description: "Updated description" };

      await ProductController.update(req, res);

      expect(ProductService.updateProduct).toHaveBeenCalledWith(productId, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(updatedProduct);
    });

    it("should handle errors during update", async () => {
      const productId = 1;
      const error = new Error("Update error");
      (ProductService.updateProduct as jest.Mock).mockRejectedValue(error);
      req.params = { id: productId.toString() };
      req.body = { name: "Updated Product", description: "Updated description" };

      await ProductController.update(req, res);

      expect(ProductService.updateProduct).toHaveBeenCalledWith(productId, req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
  describe("remove", () => {
    it("should remove a product", async () => {
      const productId = 1;
      req.params = { id: productId.toString() };

      await ProductController.remove(req, res);

      expect(ProductService.deleteProduct).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith();
    });

    it("should handle errors during remove", async () => {
      const productId = 1;
      const error = new Error("Remove error");
      (ProductService.deleteProduct as jest.Mock).mockRejectedValue(error);
      req.params = { id: productId.toString() };

      await ProductController.remove(req, res);

      expect(ProductService.deleteProduct).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });

    it("should handle errors during remove", async () => {
      const productId = 1;
      const error = new Error("Remove error");
      (ProductService.deleteProduct as jest.Mock).mockRejectedValue(error);
      req.params = { id: productId.toString() };

      await ProductController.remove(req, res);

      expect(ProductService.deleteProduct).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
});