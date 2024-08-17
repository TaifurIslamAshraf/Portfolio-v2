import ejs from "ejs";
import httpStatus from "http-status";
import { isValidObjectId } from "mongoose";
import path from "path";
import config from "../../../config/config";
import ApiError from "../../../errorHandlers/ApiError";
import { createJwtToken, verifyJwtToken } from "../../../helpers/jwtHelper";
import { sendMail } from "../../../helpers/sendMail";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { ILogin, IUserSubset } from "./auth.interface";

const createUserIntodb = async (payload: IUserSubset) => {
  const isEmailExist = await User.exists({ email: payload.email });
  if (isEmailExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Alredy Exist");
  }

  await User.create(payload);
};

//login service
const loginService = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordMatch = await user?.comparePassword(payload.password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const result = await User.findOne({ email: payload.email });

  return result;
};

//user findById
const userFindById = async (id: string): Promise<IUser> => {
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid User ID");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

//update password into db
const updatePasswordIntodb = async (
  payload: { oldPassword: string; newPassword: string },
  userId: string
) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await user?.comparePassword(payload.oldPassword);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid old password");
  }

  if (user?.password) {
    user.password = payload.newPassword;
  }

  await user?.save();
};

//forgot password service
const forgotPasswordService = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You dont have account with this email"
    );
  }

  const userId = user._id;

  const serverUrl = config.domains.serverSideURL;

  const forgotPasswordToken = createJwtToken(
    { _id: userId },
    config.security.forgotPasswordTokenSecret!,
    config.jwtExpires.forgotPasswordTokenExpire!
  );

  const forgotPasswordLink = `${serverUrl}/api/v1/auth/forgot-password-link-validation/${userId}/${forgotPasswordToken}`;

  await ejs.renderFile(path.join(__dirname, "../../../views/forgotMail.ejs"), {
    forgotPasswordLink,
  });

  await sendMail({
    email: email,
    subject: "Reset Your MyShop password",
    templete: "forgotMail.ejs",
    data: { forgotPasswordLink },
  });
};

//reset password service
const resetPasswordService = async (payload: {
  newPassword: string;
  token: string;
  userId: string;
}) => {
  const user = await User.findById(payload.userId).select("+password");
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You dont have account with this email"
    );
  }

  const decoded = verifyJwtToken(
    payload.token,
    config.security.forgotPasswordTokenSecret!
  );
  if (!decoded) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Reset password link");
  }

  if (user?.password) {
    user.password = payload.newPassword;
  }

  await user?.save();
};

export const authServices = {
  createUserIntodb,
  loginService,
  userFindById,
  updatePasswordIntodb,
  forgotPasswordService,
  resetPasswordService,
};
