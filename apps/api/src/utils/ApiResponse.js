
class ApiResponse {
  static success(res, data = null, message = "Success", status = 200) {
    return res.status(status).json({
      status: "success",
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

  static created(res, message = "Error", statusCode = 500, errors =[]){
    return res.status(statusCode).json({
      success:false,
      message,
      errors,
    })
  }
}

module.exports= ApiResponse;