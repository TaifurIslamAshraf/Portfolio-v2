import { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  isPublished: boolean;
  category: string;
  excerpt: string;
  featuredImage: string;
  readTime: number;
  comments: Array<{
    user: string;
    content: string;
    createdAt: Date;
  }>;
  likes: number;
  views: number;
  relatedPosts: string[]; // Array of related blog post IDs
  seoMetadata: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  status: "Draft" | "Published" | "Archived";
  lastUpdated: Date;
}

export type ICreateBlogInput = Omit<IBlog, keyof Document>;

export type IUpdateBlog = Partial<Omit<IBlog, keyof Document>>;

export type IFilter = {
  author?: string;
  tags?: string[];
  category?: string;
  isPublished?: boolean;
  status?: "Draft" | "Published" | "Archived";
};

export type IPagination = {
  page: string;
  limit: string;
};
