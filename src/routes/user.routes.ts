import { create, get, getId, update, remove } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth";

const userRoutes = (app: any) => {
  app.post("/user", create);
  app.get("/user", verifyToken, get)
  app.get("/user/:id",verifyToken, getId)
  app.put("/user/:id", verifyToken,update)
  app.delete("/user/:id",verifyToken, remove)
}

export default userRoutes