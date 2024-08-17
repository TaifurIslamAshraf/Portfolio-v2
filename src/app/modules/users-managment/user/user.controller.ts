import httpStatus from "http-status";
import ApiError from "../../../errorHandlers/ApiError";
import catchAsync from "../../../middlewares/catchAsync";
import sendResponse from "../../../utilities/sendResponse";
import { authServices } from "../auth/auth.service";
import { IUserUpdate } from "./user.interface";
import { userService } from "./user.service";

//get me
const getUserInfo = catchAsync(async (req, res) => {
  const userId = res.locals.user._id;
  const user = await authServices.userFindById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUserFromdb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "All user here",
    data: result,
  });
});

//update user info
const updateUser = catchAsync(async (req, res) => {
  const {
    name,
    email,
    avatar,
    bio,
    website,
    location,
    linkedin,
    github,
    twitter,
  } = req.body;

  const userId = res.locals.user._id;
  const payload: IUserUpdate = {
    name,
    email,
    profile: {
      avatar,
      bio,
      website,
      location,
      social: {
        linkedin,
        github,
        twitter,
      },
    },
  };

  const user = await userService.updateUserIntodb(payload, userId);

  sendResponse(res, {
    success: true,
    message: "User info update successfull",
    data: user,
    statusCode: httpStatus.OK,
  });
});

export const userControllers = { getUserInfo, updateUser, getAllUsers };
