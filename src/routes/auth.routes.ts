import AuthController from "../controllers/auth.controller";

const authRoutes = (app: any) => {
  app.post("/login", AuthController.authenticate);
}

export default authRoutes