import { create, get, getId, update } from "../controllers/user.controller";

const userRoutes = (app) => {
  app.post("/user", create);
  app.get("/user", get)
  app.get("/user/:id", getId)
  app.put("/user/:id", update)
}

export default userRoutes