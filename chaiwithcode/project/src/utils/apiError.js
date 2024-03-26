// Define the ApiError class which extends the native Error class
class ApiError extends Error {
    // Initialize the ApiError class
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
      // Call the constructor of the native Error class with the message
      super(message);
  
      // Set the HTTP status code
      this.statusCode = statusCode;
  
      // Set the response data to null
      this.data = null;
  
      // Set the message
      this.message = message;
  
      // Set the success status
      this.success = false;
  
      // Set the error details
      this.error = errors;
  
      // If the stack trace is provided, set this.stack
      if (stack) {
        this.stack = stack;
      } else {
        // If the stack is not provided, use the Error.captureStackTrace() method to generate a stack trace
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  // Export the ApiError class for use in other modules
  export default {
    ApiError
  }