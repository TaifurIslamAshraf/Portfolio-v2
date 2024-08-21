import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../utilities/sendResponse";
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

export const portfolioControllers = { getAllProjects };
