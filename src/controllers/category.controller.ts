import { createCategory, getAll, getById, updateCategory, deleteCategory } from "../repositories/category.repository";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const category = await createCategory(req.body);
    res.status(200).send(category);
  } catch(err){
    res.status(400).send(err);
  }
}

export const get = async (req: Request, res: Response) => {
  try{
    const category = await getAll()
    res.status(200).send(category)
  }catch(err){
    res.status(400).send(err)
  }
}

export const getId = async (req: Request, res: Response) => {
  try {
    const category = await getById(Number(req.params.id))
    res.status(200).send(category)
  } catch(err) {
    res.status(400).send(err)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const category = await updateCategory(Number(req.params.id), req.body)
    res.status(200).send(category)
  } catch(err) {
    res.status(400).send(err)
  }
}
export const remove = async (req: Request, res: Response) => {
  try {
    await deleteCategory(Number(req.params.id))
    res.status(200).send()
  } catch(err) {
    res.status(400).send(err)
  }
}