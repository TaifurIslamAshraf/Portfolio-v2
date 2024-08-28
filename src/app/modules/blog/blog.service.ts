import httpStatus from "http-status";
import lodash from "lodash";
import { Types } from "mongoose";
import ApiError from "../../errorHandlers/ApiError";
import {
  IBlog,
  ICreateBlogInput,
  IFilter,
  IUpdateBlog,
} from "./blog.interface";
import BlogModel from "./blog.model";

const findAllBlogs = async (filter: IFilter, limit = 10): Promise<IBlog[]> => {
  const blogs = await BlogModel.find(filter).limit(limit);
  return blogs;
};

const blogFindById = async (id: string): Promise<IBlog> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog id is invalid");
  }
  const blog = await BlogModel.findById(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
  return blog;
};

const createBlogIntodb = async (payload: ICreateBlogInput) => {
  await BlogModel.create(payload);
};

const updateBlogIntodb = async (
  payload: IUpdateBlog,
  id: string
): Promise<IBlog> => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog id is invalid");
  }

  const existingBlog = await BlogModel.findById(id);
  if (!existingBlog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const updatedBlogData = lodash.merge({}, existingBlog.toObject(), payload);

  // Perform the update
  const result = await BlogModel.findByIdAndUpdate(id, updatedBlogData, {
    runValidators: true,
    new: true,
  });

  return result!;
};

const deleteBlogFromdb = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Blog id is invalid");
  }

  const blog = await BlogModel.findByIdAndDelete(id);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found");
  }
};

export const blogServices = {
  findAllBlogs,
  blogFindById,
  createBlogIntodb,
  updateBlogIntodb,
  deleteBlogFromdb,
};
