import { z } from "zod";

export const createProject = z.object({
  body: z.object({
    title: z.string({
      required_error: "Project title is required",
      invalid_type_error: "Project title must be a string",
    }),
    description: z.string({
      required_error: "Project description is required",
      invalid_type_error: "Project description must be a string",
    }),
    technologies: z
      .array(z.string())
      .min(1, "At least one technology is required"),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    imageUrls: z.array(z.string()).min(1, "At least one image URL is required"),
    startDate: z.date({
      required_error: "Project start date is required",
      invalid_type_error: "Project start date must be a valid date",
    }),
    endDate: z.date().optional(),
    category: z.string({
      required_error: "Project category is required",
      invalid_type_error: "Project category must be a string",
    }),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    teamSize: z
      .number({
        required_error: "Project team size is required",
        invalid_type_error: "Project team size must be a number",
      })
      .positive("Team size must be a positive number"),
    role: z.string({
      required_error: "Project role is required",
      invalid_type_error: "Project role must be a string",
    }),
    challenges: z
      .array(z.string())
      .min(1, "At least one challenge is required"),
    solutions: z.array(z.string()).min(1, "At least one solution is required"),

    features: z.array(z.string()).min(1, "At least one feature is required"),
    testimonials: z
      .array(
        z.object({
          name: z.string({
            required_error: "Testimonial name is required",
            invalid_type_error: "Testimonial name must be a string",
          }),
          role: z.string({
            required_error: "Testimonial role is required",
            invalid_type_error: "Testimonial role must be a string",
          }),
          comment: z.string({
            required_error: "Testimonial comment is required",
            invalid_type_error: "Testimonial comment must be a string",
          }),
        })
      )
      .min(1, "At least one testimonial is required"),
    metrics: z.object({
      users: z.number().optional(),
      downloads: z.number().optional(),
      revenue: z.number().optional(),
    }),
    status: z.enum(["In Progress", "Completed", "On Hold"], {
      required_error: "Project status is required",
    }),
    version: z.string().optional(),
  }),
});

export const updateProject = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    technologies: z.array(z.string()).min(1).optional(),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
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
    status: z.enum(["In Progress", "Completed", "On Hold"]).optional(),
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
