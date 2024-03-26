import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Validation - not empty
  if (![fullName, username, email, password].every(field => field && field.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists: username, email
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Upload avatar and cover image to Cloudinary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  let avatar, coverImage;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  } catch (error) {
    throw new ApiError(500, "Failed to upload avatar or cover image");
  }

  // Ensure both avatar and cover image uploads were successful
  if (!avatar || !coverImage) {
    throw new ApiError(500, "Failed to upload avatar or cover image");
  }

  // Create user object and save to the database
  const newUser = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to register user");
  }

  // Retrieve newly registered user details
  const registeredUser = await User.findById(newUser._id).select("-password -refreshToken");

  if (!registeredUser) {
    throw new ApiError(500, "Failed to retrieve registered user details");
  }

  // Return success response
  return res.status(201).json(new ApiResponse(201, registeredUser, "User registered successfully"));
});

export { registerUser };
