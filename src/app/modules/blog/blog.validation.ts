import { z } from "zod";

const baseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  featuredImage: z.string().url("Featured image must be a valid URL"),
  readTime: z.number().positive("Read time must be a positive number"),
  seoMetadata: z.object({
    metaTitle: z.string().min(1, "Meta title is required"),
    metaDescription: z.string().min(1, "Meta description is required"),
    keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  }),
  status: z.enum(["Draft", "Published", "Archived"]),
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

export const blogZodSchema = {
  createBlog,
  updateBlog,
  getBlogs,
};
