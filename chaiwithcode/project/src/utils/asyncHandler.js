// Wraps an asynchronous handler function to handle the case where it throws an error.
// Returns a middleware function that catches errors and passes them to the next Express middleware function.

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

export { asyncHandler }
