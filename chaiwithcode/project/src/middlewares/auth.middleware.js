// This module exports a middleware function verifyJWT that decodes and verifies the JWT token provided by the user, checks if the user exists in the database, and sets the req.user property to the retrieved user object.
// If the token is invalid, the verifyJWT middleware function throws an error with a 401 status code and a "Not authenticated" message. If the user associated with the token doesn't exist in the database, the verifyJWT middleware function throws an error with a 401 status code and an "Invalid Access Token" message.

import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    new ApiError(401, error?.message || "Authentication failed");
  }
});

export { verifyJWT };
