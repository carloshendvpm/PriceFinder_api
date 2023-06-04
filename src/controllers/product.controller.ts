import { Request, Response } from "express";
import { idSchema } from "../validations/product.validation";
import ProductService from "../repositories/product.repository";
import * as Yup from 'yup';

class ProductController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).send({ message: "Missing product fields" });
    }
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
      const id = Number(req.params.id);
  
      await idSchema.validate(id);
  
      const product = await ProductService.getById(id);
  
      if (!product) {
        return res.status(404).send("Product not found");
      }
  
      res.status(200).send(product);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).send(err);
      }
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