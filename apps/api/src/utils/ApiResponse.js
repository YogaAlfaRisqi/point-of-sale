
class ApiResponse {
  static success(res, data = null, message = "Success", status = 200) {
    return res.status(status).json({
      status: "success",
      message,
      data,
    });
  }
}

module.exports= ApiResponse