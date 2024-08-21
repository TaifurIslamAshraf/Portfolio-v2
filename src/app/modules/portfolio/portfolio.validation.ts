import { z } from "zod";

const createProject = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    imageUrls: z.array(z.string().url()),
    startDate: z.date(),
    endDate: z.date().optional(),
    category: z.enum(["Web", "Mobile", "Desktop", "AI/ML", "Other"]),
    tags: z.array(z.string()),
    teamSize: z.number().int().positive(),
    role: z.string(),
    challenges: z.array(z.string()),
    solutions: z.array(z.string()),
    features: z.array(z.string()),
    testimonials: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        comment: z.string(),
      })
    ),
    metrics: z
      .object({
        users: z.number().int().nonnegative().optional(),
        downloads: z.number().int().nonnegative().optional(),
        revenue: z.number().nonnegative().optional(),
      })
      .optional(),
    status: z.enum(["In Progress", "Completed", "On Hold"]),
    version: z.string().optional(),
    lastUpdated: z.date(),
  }),
});

const getProjects = z.object({
  query: z.object({
    status: z.string().optional(),
    tags: z.string().optional(),
    category: z.string().optional(),
    technologies: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const portfolioZodSchema = { createProject, getProjects };
