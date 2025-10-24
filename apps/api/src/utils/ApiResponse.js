
class ApiResponse {
  static success(res, data ={} , message = "Success", status = 200) {
    return res.status(Number(status)).json({
      status:true,
      message,
      data,
    });
  }

  static created(res,  message = "Created", data = null){
    return res.status(201).json({
      success:true,
      message,
      data,
    });
  }

  static error(res, statusCode = 500, message = "Internal Server Error", details = null) {
    const response = {
      status: "error",
      message,
    };

    if (details) response.details = details; // untuk Joi validation atau error spesifik

    return res.status(Number(statusCode) || 500).json(response);
  }
}

module.exports= ApiResponse;