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

const updatePassword = z.object({
  body: z.object({
    oldPassword: z
      .string({ required_error: "Old Password required" })
      .min(6, "Password should be at least 6 characters"),
    newPassword: z
      .string({ required_error: "New Password required" })
      .min(6, "Password should be at least 6 characters"),
  }),
});

const resetPassword = z.object({
  body: z.object({
    newPassword: z
      .string({ required_error: "New Password required" })
      .min(6, "Password should be at least 6 characters"),
    token: z.string({ required_error: "Token is required" }),
    userId: z.string({ required_error: "User id is required" }),
  }),
});

const updateUserRole = z.object({
  body: z.object({
    userId: z.string({ required_error: "User Id is required" }),
    role: z.enum(["admin", "user"]),
  }),
});

export const authZodSchema = {
  createUser,
  loginUser,
  updatePassword,
  resetPassword,
  updateUserRole,
};
