import { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string | object;
  tags: string[];
  image: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  isPublished: boolean;
  comments: Array<{
    user: string;
    content: string;
    createdAt: Date;
  }>;
}

export type ICreateBlogInput = Omit<IBlog, keyof Document>;

export type IUpdateBlog = Partial<Omit<IBlog, keyof Document>>;

export type IFilter = {
  tags?: string[];
  isPublished?: boolean;
};

export type IPagination = {
  page: string;
  limit: string;
};
