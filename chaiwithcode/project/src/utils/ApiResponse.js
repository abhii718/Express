// Defines a custom class ApiResponse for creating HTTP response objects.
// Takes three parameters: statusCode, data, and message and sets the statusCode, data, message, and success properties based on the provided values.

class ApiResponse {
  constructor(statusCode, data, message = "Success"){
      this.statusCode = statusCode
      this.data = data
      this.message = message
      this.success = statusCode < 400
  }
}

export { ApiResponse }