import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .max(20, "Max character 20"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Enter a valid email"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Enter a valid email"),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const authZodSchema = { createUser, loginUser };
