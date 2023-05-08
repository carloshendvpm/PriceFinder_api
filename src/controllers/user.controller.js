import { createUser, getAll, getById, updateUser, deleteUser } from "../repositories/user.repository";
import { userValidation } from "../validations/user.validation";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    await userValidation.validate(req.body);
    const hashPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPass;
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch(err){
    res.status(400).send(err);
  }
}

export const get = async (req, res) => {
  try{
    const users = await getAll()
    res.status(200).send(users)
  }catch(err){
    res.status(400).send(err)
  }
}

export const getId = async (req, res) => {
  try {
    const user = await getById(Number(req.params.id))
    res.status(200).send(user)
  } catch(err) {
    res.status(400).send(e)
  }
}

export const update = async (req, res) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body)
    res.status(200).send(user)
  } catch(err) {
    res.status(400).send(err)
  }
}
export const remove = async (req, res) => {
  try {
    await deleteUser(Number(req.params.id))
    res.status(200).send()
  } catch(err) {
    res.status(400).send(err)
  }
}