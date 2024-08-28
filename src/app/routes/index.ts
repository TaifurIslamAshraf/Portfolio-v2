import { Router } from "express";
import blogRoutes from "../modules/blog/blog.route";
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
    path: "/projects",
    route: projectRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
