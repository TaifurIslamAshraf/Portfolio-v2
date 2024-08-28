import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { ICreateBlogInput, IUpdateBlog } from "./blog.interface";
import { blogServices } from "./blog.service";

const getAllBlogs = catchAsync(async (req, res) => {
  const { tags, isPublished } = req.query;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const filter: Record<string, unknown> = {};

  if (tags) {
    filter.tags = { $in: tags };
  }
  if (isPublished !== undefined) {
    filter.isPublished = isPublished === "true";
  }

  const result = await blogServices.findAllBlogs(filter, limit);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All blogs retrieved successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await blogServices.blogFindById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const userId = res.locals?.user?._id;
  const blogData = req.body as ICreateBlogInput;
  const payload: ICreateBlogInput = {
    ...blogData,
    author: userId,
  };
  await blogServices.createBlogIntodb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body as IUpdateBlog;

  const result = await blogServices.updateBlogIntodb(updatedData, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const updateBlogStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;

  const result = await blogServices.updateBlogStatusIntodb(isPublished, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await blogServices.deleteBlogFromdb(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
  });
});

export const blogControllers = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  updateBlogStatus,
};
