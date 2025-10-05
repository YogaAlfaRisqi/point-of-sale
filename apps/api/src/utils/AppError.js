class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // To differentiate between operational errors and programming errors
    }
}

module.exports = AppError;