import { z } from "zod";

const baseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  image: z.string().url("Featured image must be a valid URL"),
  isPublished: z.boolean(),
  publishedAt: z.date().optional(),
});

export const createBlog = z.object({
  body: baseSchema.extend({
    publishedAt: z.date().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const updateBlog = z.object({
  body: baseSchema.partial().extend({
    publishedAt: z.date().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const getBlogs = z.object({
  query: z.object({
    author: z.string().optional(),
    tags: z.string().optional(),
    category: z.string().optional(),
    isPublished: z.string().optional(),
    status: z.enum(["Draft", "Published", "Archived"]).optional(),
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
});

export const updateBlogStatus = z.object({});
export const blogZodSchema = {
  createBlog,
  updateBlog,
  getBlogs,
  updateBlogStatus,
};
