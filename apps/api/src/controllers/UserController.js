const userService = require('../services/UserService');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await userService.getAllUsers(req.body);
      return ApiResponse.success(res, result, "User fetched succesfully")
    } catch (error) {
      console.error("🔥 Error fetching users:", error);
    return ApiResponse.error(res, "Failed to fetch users", 500, error.message);
    }
  }

}

module.exports = UserController;
