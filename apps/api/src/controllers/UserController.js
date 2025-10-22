const userService = require("../services/UserService");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await userService.getAllUsers(req.body);
      return ApiResponse.success(res, result, "User fetched succesfully");
    } catch (error) {
      console.error("🔥 Error fetching users:", error);
      return ApiResponse.error(
        res,
        "Failed to fetch users",
        500,
        error.message
      );
    }
  }

  async getMe(req, res, next) {
    try {
      return ApiResponse.success(res, "Current user", req.user);
    } catch (err) {
      console.error("🔥 Error fetching users:", error);
      return ApiResponse.error(
        res,
        "Failed to fetch users",
        500,
        error.message
      );
    }
  }

  static async addUsers(req, res, next){
    try{
       return res.status(201).json({
        success:true,
        message:"succesfull add users"
       })
    }catch(error){
      console.error("🔥 Error add users:", error);
      return ApiResponse.error(
        res,
        "Failed to add new user",
        500,
        error.message
      );
    }
  }

  static async updateUsers(req, res, next){
    try{
       return res.status(201).json({
        success:true,
        message:"succesfull update users"
       })
    }catch(error){
      console.error("🔥 Error update users:", error);
      return ApiResponse.error(
        res,
        "Failed to update new user",
        500,
        error.message
      );
    }
  }

  static async deleteUsers(req, res, next){
    try{
       return res.status(201).json({
        success:true,
        message:"succesfull delete users"
       })
    }catch(error){
      console.error("🔥 Error delete users:", error);
      return ApiResponse.error(
        res,
        "Failed to delete user",
        500,
        error.message
      );
    }
  }
}

module.exports = UserController;
