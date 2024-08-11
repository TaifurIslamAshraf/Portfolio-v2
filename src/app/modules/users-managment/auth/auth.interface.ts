import { IUser } from "../user/user.interface";

export type IUserSubset = Pick<IUser, "name" | "email" | "password">;
export type ILogin = Pick<IUser, "email" | "password">;
