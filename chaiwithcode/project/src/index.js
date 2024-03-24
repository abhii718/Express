// Import dotenv module to load environment variables from .env file
import dotenv from "dotenv";

// Import the connectDB function that connects to MongoDB
import connectDB from "./db/index.js";

// Load environment variables from the .env file
dotenv.config({
  path: "./env",
});

// Connect to MongoDB using the connectDB function
const dbConnection = connectDB();

// Wait for the MongoDB connection to be established, then start the server
dbConnection
  .then(() => {
    // Import the Express application
    const app = express();

    // Configure Cross-Origin Resource Sharing (CORS) middleware
    app.use(
      cors({
        // Enable CORS for the given origin
        origin: process.env.CORS_ORIGIN,
        // Set credentials option true for accessing protected resources
        credentials: true,
      })
    );

    // Configure JSON request body parsing
    app.use(
      express.json({
        // Limit the request body size to 16kb
        limit: "16kb",
      })
    );

    // Configure URL-encoded request body parsing
    app.use(
      express.urlencoded({
        // Allow extended Tiny Encoding
        extended: true,
        // Limit the request body size to 16kb
        limit: "16kb",
      })
    );

    // Use the Express static middleware to serve static files
    app.use(express.static("public"));

    // Configure Cookie-parser middleware to handle cookies
    app.use(cookieParser());

    // Start the server
    app.listen(process.env.PORT || 8000, () => {
      // Log information about the server start
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection is failed !!!", error);
  });
  

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
