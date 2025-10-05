const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {
  console.error("🔥 Error:", err);

  if (err instanceof AppError) {
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
