import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { authControllers } from "./auth.controller";
import { authZodSchema } from "./auth.validation";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validateRequest(authZodSchema.createUser),
  authControllers.createUser
);

authRoutes.post(
  "/login",
  validateRequest(authZodSchema.loginUser),
  authControllers.loginUser
);

authRoutes.get("/logout", authControllers.logout);

export default authRoutes;
