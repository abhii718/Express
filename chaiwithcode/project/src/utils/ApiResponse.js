// Define the ApiResponse class
class ApiResponse {
    // Initialize the ApiResponse class
    constructor(statusCode, data, message = "Success") {
      // Set the HTTP status code
      this.status = statusCode;
  
      // Set the response data
      this.data = data;
  
      // Set the message
      this.message = message;
  
      // Set the success status based on the status code
      this.success = statusCode < 400;
    }
  }
  
  // Export the ApiResponse class for use in other modules
  module.exports = {
    ApiResponse
  }
  