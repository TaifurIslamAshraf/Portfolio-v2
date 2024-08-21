import { Router } from "express";
import projectRoutes from "../modules/portfolio/portfolio.route";
import authRoutes from "../modules/users-managment/auth/auth.route";
import userRoutes from "../modules/users-managment/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/project",
    route: projectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
