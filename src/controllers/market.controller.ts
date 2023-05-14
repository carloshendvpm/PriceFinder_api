import { createMarket, getAll, getById, updateMarket, deleteMarket } from "../repositories/market.repository";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const market = await createMarket(req.body);
    res.status(200).send(market);
  } catch(err){
    res.status(400).send(err);
  }
}

export const get = async (req: Request, res: Response) => {
  try{
    const markets = await getAll()
    res.status(200).send(markets)
  }catch(err){
    res.status(400).send(err)
  }
}

export const getId = async (req: Request, res: Response) => {
  try {
    const market = await getById(Number(req.params.id))
    res.status(200).send(market)
  } catch(err) {
    res.status(400).send(err)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const market = await updateMarket(Number(req.params.id), req.body)
    res.status(200).send(market)
  } catch(err) {
    res.status(400).send(err)
  }
}
export const remove = async (req: Request, res: Response) => {
  try {
    await deleteMarket(Number(req.params.id))
    res.status(200).send()
  } catch(err) {
    res.status(400).send(err)
  }
}