import { prisma } from "../services/prisma";
import Market from "../interfaces/market.interface";

class MarketService {
  async createMarket(data: Market) {
    const market = await prisma.market.create({
      data,
    });
    return market;
  }

  async getAll() {
    const markets = await prisma.market.findMany({
        include: {
            Products: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return markets;
}

  async getById(id: number) {
    const market = await prisma.market.findUnique({
      where: { id },
    });
    return market;
  }

  async updateMarket(id: number, data: Market) {
    const market = await prisma.market.update({
      where: {
        id,
      },
      data,
    });
    return market;
  }

  async deleteMarket(id: number) {
    await prisma.market.delete({
      where: {
        id,
      },
    });
  }
}

export default new MarketService();