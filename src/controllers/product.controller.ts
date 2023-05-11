import { createProduct, getAll, getById, updateProduct, deleteProduct } from "../repositories/product.repository";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const product = await createProduct(req.body);
    res.status(200).send(product);
  } catch(err){
    res.status(400).send(err);
  }
}

export const get = async (req: Request, res: Response) => {
  try{
    const products = await getAll()
    res.status(200).send(products)
  }catch(err){
    res.status(400).send(err)
  }
}

export const getId = async (req: Request, res: Response) => {
  try {
    const product = await getById(Number(req.params.productId))
    res.status(200).send(product)
  } catch(err) {
    res.status(400).send(err)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const product = await updateProduct(Number(req.params.id), req.body)
    res.status(200).send(product)
  } catch(err) {
    res.status(400).send(err)
  }
}
export const remove = async (req: Request, res: Response) => {
  try {
    await deleteProduct(Number(req.params.id))
    res.status(200).send()
  } catch(err) {
    res.status(400).send(err)
  }
}