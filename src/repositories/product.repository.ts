import { prisma } from "../services/prisma";
import Product from "../interfaces/product.interface";

class ProductService {
  async createProduct(data: Product) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        ean: data.ean,
        price: data.price,
        market: {
          connect: {
            id: data.market_id
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        ean: true,
        market: true,
        price: true
      }
    });
    return product;
  }

  async getAll() {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        ean: true,
        market: true,
        price: true
      },
    });
    return products;
  }

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        ean: true,
        price: true,
      },
    });
    return product;
  }

  async updateProduct(id: number, data: Product) {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        ean: true,
        price: true,
      }
    });
    return product;
  }

  async deleteProduct(id: number) {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}

export default new ProductService();