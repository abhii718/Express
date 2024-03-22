// Require the Express framework
const express = require("express");

// Create an Express application
const app = express();

// Set the view engine to EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("./public"));

// Define a route for the root path ("/") that renders an EJS template
app.get("/", function(req, res) {
    // Render the "index" template and pass an age variable with a value of 12
    res.render("index", { age: 12 });
});

// Define a route for "/error" that throws an intentional error
app.get("/error", function(req, res) {
    // Throw an error with a message
    throw Error("This is an intentional error");
});

// Define an error handling middleware function to catch errors thrown by routes
function errorHandler(err, req, res, next) {
    // Check if headers have already been sent
    if (res.headersSent) {
        // If headers have been sent, pass the error to the next middleware
        return next(err);
    }
    // Set the HTTP status code to 500 (Internal Server Error)
    res.status(500);
    // Render the "error" template and pass the error object to it
    res.render('error', { error: err });
}

// Register the error handling middleware function
app.use(errorHandler);

// Start the server and listen on port 3000
app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
