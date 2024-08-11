import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import ApiError from "../errorHandlers/ApiError";
import catchAsync from "./catchAsync";

import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../helpers/jwtHelper";
import User from "../modules/users-managment/user/user.model";

export const extractTokenFromHeader = (req: Request, tokenType: string) => {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];

  return type === tokenType ? token : undefined;
};

export const isAuthenticated = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = extractTokenFromHeader(req, "Bearer") as string;

    if (!access_token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Please login to access this recourse"
      );
    }
    const decoded = verifyJwtToken(
      access_token,
      config.security.accessTokenSecret!
    ) as JwtPayload;

    if (!decoded) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Invalid access token. please login"
      );
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Please login to access this recourse"
      );
    }

    res.locals.user = user;

    next();
  }
);

export const authorizeUser = (...roles: string[]) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(res.locals.user.role)) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        `${res.locals.user.role} is not allowed to access this recourse`
      );
    }

    next();
  });
};

export default { authorizeUser, isAuthenticated };
