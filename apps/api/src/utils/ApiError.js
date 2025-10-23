class ApiError extends Error {
    constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    // agar stack trace lebih jelas
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;