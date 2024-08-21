import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { ICreateProjectInput, IUpdateProject } from "./portfolio.interface";
import { portfolioServices } from "./portfolio.service";

const getAllProjects = catchAsync(async (req, res) => {
  const { status, tags, category, technologies } = req.query;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const filter: Record<string, unknown> = {};
  if (status) {
    filter.status = status;
  }
  if (tags) {
    filter.tags = tags;
  }
  if (category) {
    filter.category = category;
  }
  if (technologies) {
    filter.technologies = { $in: technologies };
  }

  const result = await portfolioServices.findAllProjects(filter, limit);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All project retrive success",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await portfolioServices.projectFindById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "project retrive success",
    data: result,
  });
});

const createProject = catchAsync(async (req, res) => {
  const projectData = req.body as ICreateProjectInput;

  await portfolioServices.createProjectIntodb(projectData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "project create successfull",
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body as IUpdateProject;

  const result = await portfolioServices.updateProjectIntodb(updatedData, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "project update successfull",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;

  await portfolioServices.deleteProjectFromdb(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "project delete successfull",
  });
});

export const portfolioControllers = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
