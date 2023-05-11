import { create, get, getId, update, remove } from "../controllers/product.controller";
import { verifyToken } from "../middlewares/auth";

const productRoutes = (app: any) => {
  app.post("/product", verifyToken, create);
  app.get("/product", verifyToken, get);
  app.get("/product/:id",verifyToken, getId);
  app.put("/product/:id", verifyToken, update);
  app.delete("/product/:id", verifyToken, remove);
}

export default productRoutes