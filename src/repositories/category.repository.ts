import { prisma } from "../services/prisma";
import Category from "../interfaces/category.interface";

export const createCategory = async(data: Category) => {
  const category = await prisma.category.create({
    data,
  })
  return category
}
export const getAll = async() => {
  const categories = await prisma.category.findMany();
  return categories
}
export const getById = async(id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  })
  return category
}
export const updateCategory = async (id: number, data: Category) => {
  const category = await prisma.category.update({
    where: {
      id,
    },
    data,
  })
  return category
}
export const deleteCategory = async (id: number) => {
  await prisma.category.delete({
    where: {
      id,
    }
  })
}