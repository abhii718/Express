// A new script has been added to set up a server.
// The code uses the dotenv module to load environment variables from a .env file.
// The code establishes a connection to a MongoDB database using the connectDB function.

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
