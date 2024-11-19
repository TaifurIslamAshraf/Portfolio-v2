import { z } from "zod";

export const createProject = z.object({
  body: z.object({
    title: z.string({
      required_error: "Project title is required",
      invalid_type_error: "Project title must be a string",
    }),
  }),
});

export const updateProject = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).min(1).optional(),
    githubUrl: z
      .object({
        dashboard: z.string().optional(),
        client: z.string().optional(),
        server: z.string().optional(),
      })
      .optional(),
    liveUrl: z
      .object({
        dashboard: z.string().optional(),
        client: z.string().optional(),
        server: z.string().optional(),
      })
      .optional(),
    imageUrls: z.array(z.string()).min(1).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).min(1).optional(),
    teamSize: z.number().positive().optional(),
    role: z.string().optional(),
    challenges: z.array(z.string()).min(1).optional(),
    solutions: z.array(z.string()).min(1).optional(),
    features: z.array(z.string()).min(1).optional(),
    testimonials: z
      .array(
        z.object({
          name: z.string().optional(),
          role: z.string().optional(),
          comment: z.string().optional(),
        })
      )
      .min(1)
      .optional(),
    metrics: z
      .object({
        users: z.number().optional(),
        downloads: z.number().optional(),
        revenue: z.number().optional(),
      })
      .optional(),
    status: z.enum(["In Progress", "Completed", "On Hold", "Draft"]).optional(),
    version: z.string().optional(),
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

export const portfolioZodSchema = { createProject, getProjects, updateProject };
