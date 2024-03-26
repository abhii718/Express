import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // return res.status(200).json({
  //   message: "hi",
  //   babu: "hel",
  // });
  //get user details from frontend
  const { fullName, username, email, password } = req.body;
  console.log("email:", email);

  //validation -not emply
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exists: username, email
  const exitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (exitedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  //upload them to cloudinary , avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar || !avatar.url) {
    throw new ApiError(400, "Avatar upload failed");
  }

  if (!coverImage || !coverImage.url) {
    throw new ApiError(400, "Cover image upload failed");
  }

  //create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //remove password and refresh token field from response

  //ckeck for user creation

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User registered successfully"));
});
export { registerUser };
