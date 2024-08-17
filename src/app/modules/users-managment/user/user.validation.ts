import { z } from "zod";

const updateUser = z.object({
  body: z.object({
    name: z.string().max(20, "Max character 20").optional(),
    email: z.string().email("Enter a valid email").optional(),

    avatar: z.string().optional(),
    bio: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),

    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
  }),
});

export const userZodSchema = { updateUser };
