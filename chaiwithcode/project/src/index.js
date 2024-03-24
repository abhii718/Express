// require('dotenv').config();
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});
connectDB();

/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", () => {
      console.log("Error connecting to MongoDB");
    });
    app.listen(process.env.PORT, () => {
      console.log(`APP is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR : ", error);
  }
})(); // self invoking function to immediately execute the code
*/
