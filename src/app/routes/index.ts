import { Router } from "express";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
