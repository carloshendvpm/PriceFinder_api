import { prisma } from "../services/prisma";
import User from "../interfaces/user.interface";

export const createUser = async(data: User) => {
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
export const getById = async(id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
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
}
export const updateUser = async (id: number, data: User) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({
    where: {
      id,
    }
  });
  return;
}