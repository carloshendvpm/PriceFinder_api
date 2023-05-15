import { prisma } from "../services/prisma";
import ProductCategory from "../interfaces/productCategory.interface";

export const createProductCategory = async (data: ProductCategory) => {
  const productCategory = await prisma.productCategory.create({
    data,
  });
  return productCategory;
}