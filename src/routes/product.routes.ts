import { create, get, getId, update, remove } from "../controllers/product.controller";

const productRoutes = (app: any) => {
  app.post("/product", create);
  app.get("/product", get)
  app.get("/product/:id", getId)
  app.put("/product/:id", update)
  app.delete("/product/:id", remove)
}

export default productRoutes