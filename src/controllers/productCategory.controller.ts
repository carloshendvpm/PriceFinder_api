import ProductCategoryService from "../repositories/productCategory.repository";
import { Request, Response } from "express";

class ProductCategoryController {
  async create(req: Request, res: Response) {
    try {
      const productCategory = await ProductCategoryService.createProductCategory(req.body);
      res.status(200).send(productCategory);
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  }
}

export default new ProductCategoryController();