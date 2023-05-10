import { prisma } from "../services/prisma";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if(!(email && password)) return res.status(400).send({ error: "Email and password are required" })

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if(!user) return res.status(400).send({ error: "User not found" })

    if (user && bcrypt.compareSync(password, user.password)){
      const token = jwt.sign(
        {
          id:user.id,
          email:user.email,
          name:user.name
        },
        String(process.env.TOKEN_KEY),
        {
          expiresIn: "1h"
        }
      )
      return res.status(200).send({ token })
    } else {
      return res.status(401).send({ error: "Invalid password or email" })
    }
  } catch(err){
    return res.status(400).send({ error: err })
  }
}
