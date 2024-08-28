import { Router } from "express";
import { authorizeUser, isAuthenticated } from "../../middlewares/authGuard";
import validateRequest from "../../middlewares/validateRequest";
import { blogControllers } from "./blog.controller";
import { blogZodSchema } from "./blog.validation";

const blogRoutes = Router();

blogRoutes.get("/all-blogs", blogControllers.getAllBlogs);

blogRoutes.get("/single-blog/:id", blogControllers.getSingleBlog);

blogRoutes.post(
  "/create-blog",
  isAuthenticated,
  authorizeUser("admin"),
  validateRequest(blogZodSchema.createBlog),
  blogControllers.createBlog
);

blogRoutes.put(
  "/update-blog/:id",
  isAuthenticated,
  authorizeUser("admin"),
  validateRequest(blogZodSchema.updateBlog),
  blogControllers.updateBlog
);

blogRoutes.put(
  "/update-blog-status/:id",
  isAuthenticated,
  authorizeUser("admin"),
  validateRequest(blogZodSchema.updateBlogStatus),
  blogControllers.updateBlogStatus
);

blogRoutes.delete(
  "/delete-blog/:id",
  isAuthenticated,
  authorizeUser("admin"),
  blogControllers.deleteBlog
);

export default blogRoutes;
