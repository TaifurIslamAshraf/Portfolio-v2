import { z } from "zod";

const updateUser = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .max(20, "Max character 20"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Enter a valid email"),
    password: z.string({ required_error: "Password is required" }),
    role: z.enum(["admin", "user"]).default("user"),
    profile: z
      .object({
        avatar: z.string().optional(),
        bio: z.string().optional(),
        website: z.string().optional(),
        location: z.string().optional(),
        social: z
          .object({
            linkedin: z.string().optional(),
            github: z.string().optional(),
            twitter: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
  }),
});

export const userZodSchema = { updateUser };
