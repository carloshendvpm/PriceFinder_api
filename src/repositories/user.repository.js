import { prisma } from "../services/prisma";

export const createUser = async(data) => {
  const user = await prisma.user.create({
    data,
    select: {
      id:true,
      name:true,
      email:true,
      password:false,
      phone:true,
      createdAt:true,
      updatedAt: true
    }
  })
  return user
};
export const getAll = async() => {
  const users = await prisma.user.findMany({
    select: {
      id:true,
      name:true,
      email:true,
      password:false,
      phone:true,
      createdAt:true,
      updatedAt: true
    }
  })
  return users
}