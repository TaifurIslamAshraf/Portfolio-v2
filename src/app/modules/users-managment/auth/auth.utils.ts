import { CookieOptions, Response } from "express";

import config from "../../../config/config";
import { IUser } from "../user/user.interface";

//parse env value to inregate with falback value
const accessTokenExpire = parseInt(
  config.jwtExpires.accessTokenExpire || "1",
  10
);
const refreshTokenExpire = parseInt(
  config.jwtExpires.refreshTokenExpire || "1",
  10
);

//options for cookis
export const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + accessTokenExpire),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + refreshTokenExpire),
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const tokenUtils = (user: IUser, res: Response) => {
  const accessToken = user.accessToken();
  const refreshToken = user.refreshToken();

  // res.cookie("access_token", accessToken, accessTokenCookieOptions);
  // res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

  res.locals.user = user;

  return {
    accessToken,
    refreshToken,
    expireIn: new Date().setTime(
      new Date().getTime() + parseInt(config.jwtExpires.nextAuthExpire!)
    ),
  };
};
