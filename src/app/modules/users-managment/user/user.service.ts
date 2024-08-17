import httpStatus from "http-status";
import { merge } from "lodash";
import ApiError from "../../../errorHandlers/ApiError";
import { IUserUpdate } from "./user.interface";
import User from "./user.model";

const updateUserIntodb = async (payload: IUserUpdate, userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const updateFields = Object.entries(payload).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    },
    {} as Record<string, unknown>
  );

  // Merge the payload into the existing user data
  const mergedUserData = merge(user.toObject(), updateFields);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: mergedUserData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};

const getAllUserFromdb = async () => {
  const users = await User.find();

  return users;
};

export const userService = { updateUserIntodb, getAllUserFromdb };
