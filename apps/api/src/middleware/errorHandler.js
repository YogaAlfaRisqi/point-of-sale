
const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error Handler:", err);

  const statusCode = Number(err.statusCode) || 500;
  const message = err.message || "Internal Server Error";


  if (err.isJoi) {
    const details = err.details?.map(d => d.message) || [message];
    return ApiResponse.error(res, 400, "Validation Error", details);
  }
  return ApiResponse.error(res, statusCode, message);
};

module.exports = errorHandler;
