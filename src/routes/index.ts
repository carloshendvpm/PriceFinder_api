import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import categoryRoutes from "./category.routes";

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app);
  productRoutes(app);
  categoryRoutes(app);
}

export default routes