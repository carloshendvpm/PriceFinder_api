import { prisma } from "../services/prisma";
import Product from "../interfaces/product.interface";

export const createProduct = async(data: Product) => {
  const product = await prisma.product.create({
    data,
    select: {
      id:true,
      name:true,
      description:true,
      category:true,
      image:true,
      ean: true
    }
  })
  return product
};
export const getAll = async() => {
  const product = await prisma.product.findMany({
    select: {
      id:true,
      name:true,
      description:true,
      category:true,
      image:true,
      ean: true
    }
  })
  return product
}
export const getById = async(id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id:true,
      name:true,
      description:true,
      category:true,
      image:true,
      ean:true
    }
  })
  return product
}
export const updateProduct = async (id: number, data: Product) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data,
    select: {
      id:true,
      name:true,
      description:true,
      category:true,
      image:true,
      ean: true
    }
  })
  return product
}
export const deleteProduct = async (id: number) => {
  await prisma.product.delete({
    where: {
      id,
    },
  })
}