import { createUser } from "../repositories/user.repository";
import { userValidation } from "../validations/user.validation";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  try {
    await userValidation.validate(req.body)

    const hashPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPass;
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch(err){
    res.status(400).send(err);
  }
}