const ApiError = require("../utils/ApiError");

function errorHandler(err, req, res, next) {
  console.error("🔥 errorHandler:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // fallback untuk error tidak terduga
  return res.status(500).json({
    success: false,
    message: "Internal server error. Please try again later.",
  });
}

module.exports = errorHandler;
