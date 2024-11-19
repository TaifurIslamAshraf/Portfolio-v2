import { model, Schema } from "mongoose";
import { IUpdateProject } from "./portfolio.interface";

const projectSchema = new Schema<IUpdateProject>({
  title: { type: String },
  description: { type: String },
  technologies: { type: [String] },
  githubUrl: {
    dashboard: { type: String },
    client: { type: String },
    server: { type: String },
  },
  liveUrl: {
    dashboard: { type: String },
    client: { type: String },
    server: { type: String },
  },
  imageUrls: { type: [String] },
  startDate: { type: Date },
  endDate: { type: Date },
  category: {
    type: String,
  },
  tags: { type: [String] },
  teamSize: { type: Number },
  role: { type: String },
  challenges: { type: [String] },
  solutions: { type: [String] },
  features: { type: [String] },
  testimonials: [
    {
      name: { type: String },
      role: { type: String },
      comment: { type: String },
    },
  ],
  metrics: {
    users: { type: Number },
    downloads: { type: Number },
    revenue: { type: Number },
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "On Hold", "Draft"],
  },
  version: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

const ProjectModel = model<IUpdateProject>("Project", projectSchema);
export default ProjectModel;
