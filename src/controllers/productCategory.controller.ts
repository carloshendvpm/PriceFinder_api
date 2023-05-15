import { createProductCategory } from "../repositories/productCategory.repository";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const productCategory = await createProductCategory(req.body);
    res.status(200).send(productCategory);
  } catch(err){
    res.status(400).send(err);
  }
}