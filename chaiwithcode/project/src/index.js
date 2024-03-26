import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
.then(() => {

  app.get("/", (req, res) => {
    console.log("hi I am abhi singh");
    res.send("Hello World!");
  });
  app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})









/*
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

const dbConnection = connectDB();

dbConnection
  .then(() => {
    const app = express();

    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
    );

    app.use(
      express.json({
        limit: "16kb",
      })
    );

    app.use(
      express.urlencoded({
        extended: true,
        limit: "16kb",
      })
    );

    app.use(express.static("public"));

    app.use(cookieParser());

    app.get("/", (req, res) => {
      console.log("hi I am abhi singh");
      res.send("Hello World!");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection is failed !!!", error);
  });
*/
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
