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

projectRoutes.get("/single-project/:id", portfolioControllers.getSingleProject);
projectRoutes.post(
  "/create-project",
  validateRequest(portfolioZodSchema.createProject),
  portfolioControllers.createProject
);
projectRoutes.put(
  "/update-project/:id",
  validateRequest(portfolioZodSchema.updateProject),
  portfolioControllers.updateProject
);

projectRoutes.delete("/delete-project/:id", portfolioControllers.deleteProject);

export default projectRoutes;
