import { prisma } from "../services/prisma";
import Category from "../interfaces/category.interface";


class CategoryService {
  async createCategory(data: Category) {
    const category = await prisma.category.create({
      data,
    });
    return category;
  }

  async getAll() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async getById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  }

  async updateCategory(id: number, data: Category) {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data,
    });
    return category;
  }

  async deleteCategory(id: number) {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

export default new CategoryService();