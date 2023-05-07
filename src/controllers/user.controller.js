import { createUser } from "../repositories/user.repository"; 

export const create = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).send(user);
  } catch(err){
    res.status(400).send(err);
  }
}