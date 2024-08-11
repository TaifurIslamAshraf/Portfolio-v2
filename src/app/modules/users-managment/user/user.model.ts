import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import config from "../../../config/config";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      max: [20, "Max cheracter 20"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User Password is Required"],
      minlength: [6, "Password Must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profile: {
      avatar: { type: String },
      bio: { type: String },
      website: { type: String },
      location: { type: String },
      social: {
        linkedin: { type: String },
        github: { type: String },
        twitter: { type: String },
      },
    },
  },
  {
    timestamps: true,
  }
);

//hash pssword
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//access token
userSchema.methods.accessToken = function () {
  return jwt.sign(
    { _id: this._id },
    config.security.accessTokenSecret as string,
    {
      expiresIn: config.jwtExpires.accessTokenExpire,
    }
  );
};

//refresh token
userSchema.methods.refreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    config.security.refreshTokenSecret as string,
    {
      expiresIn: config.jwtExpires.refreshTokenExpire,
    }
  );
};

//compare password
userSchema.methods.comparePassword = async function (
  entredPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(entredPassword, this.password);
  return isMatch;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
