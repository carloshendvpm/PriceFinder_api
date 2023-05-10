import { authenticate } from "../controllers/auth.controller";

const authRoutes = (app: any) => {
  app.post("/login", authenticate);
}

export default authRoutes