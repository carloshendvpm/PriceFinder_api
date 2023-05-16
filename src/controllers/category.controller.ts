import CategoryService from "../repositories/category.repository";
import { Request, Response } from "express";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(200).send(category);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAll();
      res.status(200).send(categories);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const category = await CategoryService.getById(Number(req.params.id));
      res.status(200).send(category);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const category = await CategoryService.updateCategory(Number(req.params.id), req.body);
      res.status(200).send(category);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await CategoryService.deleteCategory(Number(req.params.id));
      res.status(200).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default new CategoryController();