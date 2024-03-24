// Define the asyncHandler function
const asyncHandler = (requestHandler) => {
  // Return a function which takes the request (req), response (res), and next middleware function as parameters
  return (req, res, next) => {
    // Wrap the requestHandler in a Promise.resolve() to handle rejections and call the next middleware function with the error
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      // Call the next middleware function with the error
      next(err);
    });
  };
};

// Export the asyncHandler function for use in other modules
module.exports = {
  asyncHandler
}


// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 5000).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
