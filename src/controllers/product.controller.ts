import { Request, Response } from "express";
import ProductService from "../repositories/product.repository";

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const product = await ProductService.getById(Number(req.params.id));
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await ProductService.updateProduct(Number(req.params.id), req.body);
      res.status(200).send(product);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await ProductService.deleteProduct(Number(req.params.id));
      res.status(200).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }
}
export default new ProductController();