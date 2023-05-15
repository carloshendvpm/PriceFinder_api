import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import productRoutes from "./product.routes";
import categoryRoutes from "./category.routes";
import marketRoutes from "./market.routes";
import productCategoryRoutes from "./productCategory.routes";

const routes = (app: any) => {
  userRoutes(app);
  authRoutes(app);
  productRoutes(app);
  categoryRoutes(app);
  marketRoutes(app);
  productCategoryRoutes(app);
}

export default routes