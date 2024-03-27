// Defines a custom ApiError class that extends the built-in Error class.
// Takes four parameters: statusCode, message, errors, and stack.
// Sets the statusCode, message, data, success, and errors properties on the ApiError instance.
// If the stack parameter is not provided, the Error.captureStackTrace() method is called to capture the stack trace.
// Allows for easier error handling and customization of error messages and codes in an API.
// Exports the ApiError class using the export statement.

class ApiError extends Error {
  constructor(
      statusCode,
      message= "Something went wrong",
      errors = [],
      stack = ""
  ){
      super(message)
      this.statusCode = statusCode
      this.data = null
      this.message = message
      this.success = false;
      this.errors = errors

      if (stack) {
          this.stack = stack
      } else{
          Error.captureStackTrace(this, this.constructor)
      }

  }
}

export {ApiError}