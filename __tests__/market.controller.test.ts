import { Request, Response } from "express";
import MarketController from "../src/controllers/market.controller";
import MarketService from "../src/repositories/market.repository";

jest.mock("../src/repositories/market.repository", () => ({
createMarket: jest.fn(),
getAll: jest.fn(),
getById: jest.fn(),
updateMarket: jest.fn(),
deleteMarket: jest.fn()
}));

describe("MarketController", () => {
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
    it("should create a new market", async () => {
    req.body = { name: "Market 1", location: "Market location" };
    const createdMarket = { id: 1, name: "Market 1", location: "Market location" };
    (MarketService.createMarket as jest.Mock).mockResolvedValue(createdMarket);
    await MarketController.create(req, res);

      expect(MarketService.createMarket).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(createdMarket);
    });
  })
  describe("get", () => {
      it("should get all markets", async () => {
      const markets = [
      { id: 1, name: "Market 1", location: "Market location" },
      { id: 2, name: "Market 2", location: "Market location" }
      ];
      (MarketService.getAll as jest.Mock).mockResolvedValue(markets);
      await MarketController.get(req, res);

      expect(MarketService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(markets);
    });
    
    it("should handle errors during get", async () => {
      const error = new Error("Get error");
      (MarketService.getAll as jest.Mock).mockRejectedValue(error);
    
      await MarketController.get(req, res);
    
      expect(MarketService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });
  describe("getById", () => {
    it("should get market by ID", async () => {
    const marketId = 1;
    const market = { id: marketId, name: "Market 1", location: "Market location" };
    (MarketService.getById as jest.Mock).mockResolvedValue(market);
    req.params = { id: marketId.toString() };
    await MarketController.getById(req, res);

    expect(MarketService.getById).toHaveBeenCalledWith(marketId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(market);
  });
  
  it("should handle errors during getById", async () => {
    const marketId = 1;
    const error = new Error("GetById error");
    (MarketService.getById as jest.Mock).mockRejectedValue(error);
    req.params = { id: marketId.toString() };
  
    await MarketController.getById(req, res);
  
    expect(MarketService.getById).
    toHaveBeenCalledWith(marketId);
  });
});  
});
