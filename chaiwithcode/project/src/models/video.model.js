import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the schema for storing video data
const videoSchema = new Schema(
  {
    // URL of the video, likely stored on Cloudinary or a similar service
    video: {
      type: String,
      required: true,
    },
    // URL of the video thumbnail, also likely stored on Cloudinary or a similar service
    thumbnail: {
      type: String,
      required: true,
    },
    // Title of the video
    title: {
      type: String,
      required: true,
    },
    // Description of the video
    description: {
      type: String,
      required: true,
    },
    // Duration of the video
    duration: {
      type: Number,
      required: true,
    },
    // Number of views the video has received, with a default value of 0
    views: {
      type: Number,
      default: 0,
    },
    // Whether the video is published or not, with a default value of true
    isPublished: {
      type: Boolean,
      default: true,
    },
    // Reference to the user who owns the video, stored as an ObjectId referencing the User model
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Apply the mongoose-aggregate-paginate-v2 plugin to add pagination support for aggregate queries
videoSchema.plugin(mongooseAggregatePaginate);

// Create a model for the video schema
export const Video = mongoose.model("Video", videoSchema);
