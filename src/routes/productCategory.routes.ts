import ProductCategoryController from "../controllers/productCategory.controller";

const productCategoryRoutes = (app: any) => {
  app.post("/productCategory", ProductCategoryController.create);
}
export default productCategoryRoutes;