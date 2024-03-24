// Import the required modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize the express application
const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Set the allowed origin URL here
    credentials: true,
  })
);

// Configure JSON parsing
app.use(express.json({ limit: "16kb" }));

// Configure URL encoded form parsing
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Use the public directory for static assets
app.use(express.static("public"));

// Configure cookie parser
app.use(cookieParser());

// Export the express application for use in other modules
export { app };