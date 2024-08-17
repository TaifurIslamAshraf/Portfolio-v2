import { Router } from "express";
import { authorizeUser, isAuthenticated } from "../../../middlewares/authGuard";
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

authRoutes.get("/logout", isAuthenticated, authControllers.logout);

authRoutes.post("/refresh", isAuthenticated, authControllers.updateAccessToken);

authRoutes.put(
  "/update-password",
  isAuthenticated,
  validateRequest(authZodSchema.updatePassword),
  authControllers.updatePassword
);

authRoutes.put(
  "/update-role",
  isAuthenticated,
  authorizeUser("admin"),
  validateRequest(authZodSchema.updateUserRole),
  authControllers.updateUserRole
);

authRoutes.post("/forgot-password", authControllers.forgotPassword);
authRoutes.get(
  "/forgot-password-link-validation/:userId/:token",
  authControllers.forgotPasswordLinkValidation
);
authRoutes.put(
  "/reset-password",
  validateRequest(authZodSchema.resetPassword),
  authControllers.resetPassword
);

export default authRoutes;
