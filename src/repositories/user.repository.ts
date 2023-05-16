import { prisma } from "../services/prisma";
import User from "../interfaces/user.interface";

class UserService {
  async createUser(data: User) {
    const user = await prisma.user.create({
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
  }

  async getAll() {
    const users = await prisma.user.findMany({
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
    return users;
  }

  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
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
  }

  async updateUser(id: number, data: User) {
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
  }

  async deleteUser(id: number) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserService();