import UserService from "../repositories/user.repository";
import { userValidation } from "../validations/user.validation";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

class UserController {
  async create(req: Request, res: Response) {
    try {
      await userValidation.validate(req.body);

      const hashPass = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPass;

      const user = await UserService.createUser(req.body);
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await UserService.getById(userId);
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const updatedUser = req.body;

      const user = await UserService.updateUser(userId, updatedUser);
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      await UserService.deleteUser(userId);
      res.status(200).send();
    } catch (err) {
      res.status(400).send(err);
    }
  }
}

export default new UserController();