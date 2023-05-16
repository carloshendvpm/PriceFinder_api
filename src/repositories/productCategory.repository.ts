import { prisma } from "../services/prisma";
import ProductCategory from "../interfaces/productCategory.interface";

class ProductCategoryService {
  async createProductCategory(data: ProductCategory) {
    const productCategory = await prisma.productCategory.create({
      data,
    });
    return productCategory;
  }
}

export default new ProductCategoryService();