import { create, get, getId, update, remove } from "../controllers/user.controller";

const userRoutes = (app: any) => {
  app.post("/user", create);
  app.get("/user", get)
  app.get("/user/:id", getId)
  app.put("/user/:id", update)
  app.delete("/user/:id", remove)
}

export default userRoutes