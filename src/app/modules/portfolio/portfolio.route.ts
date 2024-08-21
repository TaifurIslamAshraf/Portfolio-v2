import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { portfolioControllers } from "./portfolio.controller";
import { portfolioZodSchema } from "./portfolio.validation";

const projectRoutes = Router();

projectRoutes.get(
  "/all-projects",
  validateRequest(portfolioZodSchema.getProjects),
  portfolioControllers.getAllProjects
);

export default projectRoutes;
