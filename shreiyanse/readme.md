# Node.js vs Express

## What is Express.js?

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building web applications in Node.js by providing a range of HTTP utility methods and middleware.

## Why Express.js?

Express.js allows developers to create powerful, feature-rich web applications quickly and efficiently. It simplifies common tasks such as routing, handling requests and responses, serving static files, and error handling.

## Routing

Express.js allows you to define routes for different URLs in your application. For example:
- `/profile`
- `/home`
- `/contact`
- `/profile/:username`

## Middleware

Middleware functions in Express.js run before every route handler. They have access to the request and response objects, allowing them to modify the request/response cycle.

## Dynamic Routing (Route Parameters)

Dynamic routing in Express.js involves defining routes with parameters that can change based on user input. For example, `/profile/:username` allows you to access different user profiles based on the username provided in the URL.

## Template Engines (EJS, Pug, Handlebars, Jade)

Express.js supports various template engines such as EJS, Pug (formerly Jade), and Handlebars. These template engines allow you to dynamically generate HTML pages on the server and render them in the browser.

To use EJS as the template engine:
1. Install EJS:

2. Configure Express to use EJS as the view engine:
```javascript
app.set("view engine", "ejs");
```

Create a 'views' folder and EJS files within it.
Use the render method instead of send to render EJS templates.


// Define an error handling middleware function to catch errors thrown by routes
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
}

// Register the error handling middleware function
app.use(errorHandler);


##Serving Static Files

Create a folder named 'public'.
Inside the 'public' folder, create subfolders for images, stylesheets, and JavaScript files.
Configure Express to serve static files:

app.use(express.static("public"));
