import MarketService from "../repositories/market.repository";
import { Request, Response } from "express";

class MarketController {
  async create(req: Request, res: Response) {
    try {
      const market = await MarketService.createMarket(req.body);
      res.status(200).send(market);
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const markets = await MarketService.getAll();
      res.status(200).send(markets);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const market = await MarketService.getById(Number(req.params.id));
      res.status(200).send(market);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const market = await MarketService.updateMarket(Number(req.params.id), req.body);
      res.status(200).send(market);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await MarketService.deleteMarket(Number(req.params.id));
      res.status(200).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default new MarketController();