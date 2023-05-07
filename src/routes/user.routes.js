import { create } from "../controllers/user.controller";

const userRoutes = app => {
  app.post("/user", create);
}

export default userRoutes