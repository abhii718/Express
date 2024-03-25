import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], // Error message for required field
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Auto-populate createdAt and updatedAt fields
);

userSchema.pre("save", async function (next) {
  try {
    // Hash the password before saving
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error); // Return error to the next middleware
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare provided password with the hashed password stored in the database
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // Generate JWT access token containing user information
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, // Access token secret from environment variable
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Expiry time for access token from environment variable
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  // Generate JWT refresh token containing user ID
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // Refresh token secret from environment variable
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiry time for refresh token from environment variable
    }
  );
};

export const User = mongoose.model("User", userSchema);
