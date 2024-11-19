import { Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: {
    dashboard: string;
    client: string;
    server: string;
  };
  liveUrl?: {
    dashboard: string;
    client: string;
    server: string;
  };
  imageUrls: string[];
  startDate: Date;
  endDate?: Date;
  category: string;
  tags?: string[];
  teamSize?: number;
  role: string;
  challenges: string[];
  solutions: string[];
  features: string[];
  testimonials: Array<{
    name: string;
    role: string;
    comment: string;
  }>;
  metrics?: {
    users?: number;
    downloads?: number;
    revenue?: number;
  };
  status: "In Progress" | "Completed" | "On Hold" | "Draft";
  version?: string;
  lastUpdated: Date;
}
export type ICreateProjectInput = Pick<IProject, "title">;

export type IUpdateProject = Partial<Omit<IProject, keyof Document>>;

export type IFilter = {
  status?: string;
  tags?: string;
  category?: string;
  technologies?: string[];
};
export type IPagination = {
  page: string;
  limit: string;
};
