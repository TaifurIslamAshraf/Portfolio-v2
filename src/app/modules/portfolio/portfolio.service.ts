import { IFilter } from "./portfolio.interface";
import ProjectModel from "./portfolio.model";

const findAllProjects = async (filter: IFilter, limit = 10) => {
  const projects = await ProjectModel.find(filter).limit(limit);
  return projects;
};

export const portfolioServices = { findAllProjects };
