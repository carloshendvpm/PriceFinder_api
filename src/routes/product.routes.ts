import productController from "../controllers/product.controller";
import { verifyToken } from "../middlewares/auth";

const productRoutes = (app: any) => {
  app.post("/product", productController.create);
  app.get("/product", productController.get);
  app.get("/product/:id", productController.getById);
  app.put("/product/:id",  productController.update);
  app.delete("/product/:id",  productController.remove);
}

export default productRoutes