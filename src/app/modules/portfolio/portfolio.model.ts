import { model, Schema } from "mongoose";
import { IProject } from "./portfolio.interface";

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
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
  imageUrls: { type: [String], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  category: {
    type: String,
    required: true,
  },
  tags: { type: [String] },
  teamSize: { type: Number },
  role: { type: String, required: true },
  challenges: { type: [String], required: true },
  solutions: { type: [String], required: true },
  features: { type: [String], required: true },
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
    required: true,
    enum: ["In Progress", "Completed", "On Hold"],
  },
  version: { type: String },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

const ProjectModel = model<IProject>("Project", projectSchema);
export default ProjectModel;
