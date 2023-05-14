import { prisma } from "../services/prisma";
import Market from "../interfaces/market.interface";

export const createMarket = async(data: Market) => {
  const market = await prisma.market.create({
    data,
  })
  return market
}
export const getAll = async() => {
  const markets = await prisma.market.findMany();
  return markets
}
export const getById = async(id: number) => {
  const market = await prisma.market.findUnique({
    where: { id },
  })
  return market
}
export const updateMarket = async (id: number, data: Market) => {
  const market = await prisma.market.update({
    where: {
      id,
    },
    data,
  })
  return market
}
export const deleteMarket = async (id: number) => {
  await prisma.market.delete({
    where: {
      id,
    }
  })
}