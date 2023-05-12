import { create, get, getId, update, remove } from "../controllers/category.controller";

const categoryRoutes = (app: any) => {
  app.post("/category", create);
  app.get("/category", get);
  app.get("/category/:id", getId);
  app.put("/category/:id", update);
  app.delete("/category/:id", remove);
}
export default categoryRoutes;