import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  profile: {
    avatar?: string;
    bio?: string;
    website?: string;
    location?: string;
    social?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
  comparePassword: (entredPassword: string) => Promise<boolean>;
  accessToken: () => string;
  refreshToken: () => string;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserUpdate = Pick<IUser, "name" | "email" | "profile">;
