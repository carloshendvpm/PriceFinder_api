import CategoryController from "../controllers/category.controller";

const categoryRoutes = (app: any) => {
  app.post("/category", CategoryController.create);
  app.get("/category", CategoryController.get);
  app.get("/category/:id", CategoryController.getById);
  app.put("/category/:id", CategoryController.update);
  app.delete("/category/:id", CategoryController.remove);
}
export default categoryRoutes;