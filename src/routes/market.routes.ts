import { create, get, getId, update, remove } from "../controllers/market.controller";

const marketRoutes = (app: any) => {
  app.post("/market", create);
  app.get("/market", get);
  app.get("/market/:id", getId);
  app.put("/market/:id", update);
  app.delete("/market/:id", remove);
}
export default marketRoutes;