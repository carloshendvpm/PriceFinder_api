import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app);
  productRoutes(app);
}

export default routes