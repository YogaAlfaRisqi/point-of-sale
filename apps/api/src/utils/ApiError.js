class ApiError extends Error {
    constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = Number(statusCode) || 500;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;