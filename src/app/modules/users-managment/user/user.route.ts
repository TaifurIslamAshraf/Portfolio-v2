import { Router } from "express";
import { authorizeUser, isAuthenticated } from "../../../middlewares/authGuard";
import { userControllers } from "./user.controller";

const userRoutes = Router();

userRoutes.get("/single-user", isAuthenticated, userControllers.getUserInfo);
userRoutes.get(
  "/all-users",
  isAuthenticated,
  authorizeUser("admin"),
  userControllers.getAllUsers
);
userRoutes.put(
  "/update-user",
  isAuthenticated,
  authorizeUser("admin"),
  userControllers.updateUser
);

export default userRoutes;
