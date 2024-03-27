// Defines a Mongoose schema for "Subscription" with two fields, "subscriber" and "channel," which are both of type Schema.Types.ObjectId.
// The subscriber and channel fields reference the User schema, and timestamps are set to true to include createdAt and updatedAt fields.

import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //one who is subscribing
      ref: "User",
    },

    channel: {
      type: Schema.Types.ObjectId, //whom subscribing
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
