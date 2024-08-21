import httpStatus from "http-status";
import lodash from "lodash";
import { Types } from "mongoose";
import ApiError from "../../errorHandlers/ApiError";
import {
  ICreateProjectInput,
  IFilter,
  IProject,
  IUpdateProject,
} from "./portfolio.interface";
import ProjectModel from "./portfolio.model";

const findAllProjects = async (
  filter: IFilter,
  limit = 10
): Promise<IProject[]> => {
  const projects = await ProjectModel.find(filter).limit(limit);
  return projects;
};

const projectFindById = async (id: string): Promise<IProject> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Project id is invalid");
  }
  const projects = await ProjectModel.findById(id);
  if (!projects) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  return projects;
};

const createProjectIntodb = async (payload: ICreateProjectInput) => {
  await ProjectModel.create(payload);
};

const updateProjectIntodb = async (
  payload: IUpdateProject,
  id: string
): Promise<IProject> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Project id is invalid");
  }

  const existingProject = await ProjectModel.findById(id);
  if (!existingProject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  const updatedProjectData = lodash.merge(
    {},
    existingProject.toObject(),
    payload
  );

  // Perform the update
  const result = await ProjectModel.findByIdAndUpdate(id, updatedProjectData, {
    runValidators: true,
    new: true,
  });

  return result!;
};

const deleteProjectFromdb = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Project id is invalid");
  }

  const project = await ProjectModel.findByIdAndDelete(id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
};

export const portfolioServices = {
  findAllProjects,
  projectFindById,
  createProjectIntodb,
  updateProjectIntodb,
  deleteProjectFromdb,
};
