import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../../config/config";
import ApiError from "../../../errorHandlers/ApiError";
import { createJwtToken, verifyJwtToken } from "../../../helpers/jwtHelper";
import { extractTokenFromHeader } from "../../../middlewares/authGuard";
import catchAsync from "../../../middlewares/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { IRoleUopdate, IUserSubset } from "./auth.interface";
import { authServices } from "./auth.service";
import { tokenUtils } from "./auth.utils";

const createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const payload: IUserSubset = {
    name,
    email,
    password,
  };

  await authServices.createUserIntodb(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfull",
  });
});

//login user
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const payload = {
    email: email,
    password,
  };

  const result = await authServices.loginService(payload);

  const { accessToken, refreshToken, expireIn } = tokenUtils(result!, res);

  sendResponse(res, {
    success: true,
    message: "User login successfull",
    statusCode: httpStatus.OK,
    data: { user: result, accessToken, refreshToken, expireIn },
  });
});

//logout user
const logout = catchAsync(async (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Logout successfull",
  });
});

//update access token
const updateAccessToken = catchAsync(async (req, res) => {
  const refresh_Token = extractTokenFromHeader(req, "Refresh") as string;

  if (!refresh_Token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please login to access this recourse"
    );
  }

  const decoded = verifyJwtToken(
    refresh_Token,
    config.security.refreshTokenSecret!
  ) as JwtPayload;
  if (!decoded) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please login to access this recourse"
    );
  }

  const userId = decoded._id;

  const user = await authServices.userFindById(userId);

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Please login to access this recourse"
    );
  }

  const accessToken = createJwtToken(
    { _id: userId },
    config.security.accessTokenSecret!,
    config.jwtExpires.accessTokenExpire!
  );

  const refreshToken = createJwtToken(
    { _id: userId },
    config.security.refreshTokenSecret!,
    config.jwtExpires.refreshTokenExpire!
  );

  res.locals.user = user;
  // res.cookie("access_token", accessToken, accessTokenCookieOptions);
  // res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: { accessToken, refreshToken },
  });
});

//update passowrd
const updatePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = res.locals.user._id;

  const payload = {
    oldPassword,
    newPassword,
  };

  await authServices.updatePasswordIntodb(payload, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password update successfully",
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { userId, role } = req.body as IRoleUopdate;

  const result = await authServices.userRoleService({ userId, role });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User role update successfully",
    data: result,
  });
});

//forgot password
const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is required");
  }

  await authServices.forgotPasswordService(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Check you email",
  });
});

const forgotPasswordLinkValidation = catchAsync(async (req, res) => {
  const { userId, token } = req.params;
  if (!userId || !token) {
    res.status(400).send("<h1>Invalid Link. try again</h1>");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).send("<h1>Invalid Link. try again</h1>");
  }

  const decoded = verifyJwtToken(
    token,
    config.security.forgotPasswordTokenSecret!
  );
  if (!decoded) {
    res.status(400).send("<h1>Invalid Link. try again</h1>");
  }

  res.redirect(
    `${config.domains.clientSideURL}/resetPassword/${userId}/${token}`
  );
});

const resetPassword = catchAsync(async (req, res) => {
  const { newPassword, token, userId } = req.body;

  await authServices.resetPasswordService({ newPassword, token, userId });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Reset password successfully. please login",
  });
});

export const authControllers = {
  createUser,
  loginUser,
  logout,
  updateAccessToken,
  updatePassword,
  forgotPassword,
  forgotPasswordLinkValidation,
  resetPassword,
  updateUserRole,
};
