// Connects to the MongoDB database using the Mongoose library with the MONGODB_URI and DB_NAME constants.
// If there is an error, the script logs the error and exits the process.
// If the connection is successful, the script logs the connection host.
// The connectDB function is then exported as the default export.

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
