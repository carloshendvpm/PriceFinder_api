import UserController from "../controllers/user.controller";
import auth from "../middlewares/auth";

const userRoutes = (app: any) => {
  app.post("/user", UserController.create);
  app.get("/user", auth.verifyToken, UserController.get);
  app.get("/user/:id",auth.verifyToken, UserController.getById);
  app.put("/user/:id", auth.verifyToken, UserController.update);
  app.delete("/user/:id",auth.verifyToken, UserController.remove);
}

export default userRoutes