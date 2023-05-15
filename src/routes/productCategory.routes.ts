import { create } from "../controllers/productCategory.controller";

const productCategoryRoutes = (app: any) => {
  app.post("/productCategory", create);
}
export default productCategoryRoutes;