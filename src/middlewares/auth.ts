import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "No token provided" });
    }

    try {
      const replaceToken = token.replace("Bearer ", "");
      jwt.verify(replaceToken, String(process.env.TOKEN_KEY));
      next();
    } catch (err) {
      res.status(401).send({ error: "Invalid credentials" });
    }
  }
}

export default new AuthMiddleware();