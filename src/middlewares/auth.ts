import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const verifyToken = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;

  if(!token) return res.status(401).send({"error": "No token provided"});

  try {
    const replaceToken = token.replace("Bearer ", "");
    jwt.verify(replaceToken, String(process.env.TOKEN_KEY));
    next();
  }catch(err){
    res.status(401).send({"error": "Invalid credentials"});
  }
}