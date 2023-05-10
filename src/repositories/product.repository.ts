import { prisma } from "../services/prisma";
import Product from "../types/product.types";

export const createProduct = async(data: Product) => {
  const product = await prisma.product.create({
    data,
    select: {
      productId:true,
      name:true,
      description:true,
      category:true,
      image:true
    }
  })
  return product
};
export const getAll = async() => {
  const product = await prisma.product.findMany({
    select: {
      productId:true,
      name:true,
      description:true,
      category:true,
      image:true
    }
  })
  return product
}
export const getById = async(productId: BigInteger) => {
  const product = await prisma.product.findUnique({
    where: { productId },
    select: {
      productId:true,
      name:true,
      description:true,
      category:true,
      image:true
    }
  })
  return product
}
export const updateProduct = async (productId: BigInteger, data: Product) => {
  const product = await prisma.product.update({
    where: {
      productId,
    },
    data,
    select: {
      productId:true,
      name:true,
      description:true,
      category:true,
      image:true
    },
  });
  return product;
};

export const deleteProduct = async (productId: BigInteger) => {
  await prisma.product.delete({
    where: {
      productId,
    }
  });
  return;
}