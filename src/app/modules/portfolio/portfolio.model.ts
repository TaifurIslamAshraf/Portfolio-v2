import { model, Schema } from "mongoose";
import { IProject } from "./portfolio.interface";

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  githubUrl: { type: String },
  liveUrl: { type: String },
  imageUrls: { type: [String], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  category: {
    type: String,
    required: true,
  },
  tags: { type: [String], required: true },
  teamSize: { type: Number, required: true },
  role: { type: String, required: true },
  challenges: { type: [String], required: true },
  solutions: { type: [String], required: true },
  features: { type: [String], required: true },
  testimonials: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
      comment: { type: String, required: true },
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
