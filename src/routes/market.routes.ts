import MarketController from "../controllers/market.controller";

const marketRoutes = (app: any) => {
  app.post("/market", MarketController.create);
  app.get("/market", MarketController.get);
  app.get("/market/:id", MarketController.getById);
  app.put("/market/:id", MarketController.update);
  app.delete("/market/:id", MarketController.remove);
}
export default marketRoutes;