const { loginSchema, registerSchema } = require("../middleware/authValidator");
const authService = require("../services/AuthService");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      // ✅ Validasi dengan Joi
      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        throw new ApiError(error.details[0].message, 400);
      }

      // Ambil value yang sudah tervalidasi
      const { username, name, email, password } = value;

      const newUser = await authService.register({
        username,
        name,
        email,
        password,
      });
      console.log(newUser);
      const payload = {
        id: newUser.id,
        email: newUser.email,
      };
      // console.log(payload);
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return ApiResponse.success(res, {
        message: "User registered successfully",
        data: {
          accessToken,
          refreshToken,
        },
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {

      // ✅ Validasi dengan Joi
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        throw new ApiError(error.details[0].message, 400);
      }

      const { identifier, password } = value ;

      const { accessToken, refreshToken } = await authService.login({
        identifier,
        password,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24, // 1 hari
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 hari
      });

      return ApiResponse.success(res, {
        message: "Login Succesfully",
        accessToken,
        refreshToken,
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res) {
    const { email } = req.body;
    try {
      await AuthService.resetPassword(email);
      res.status(200).json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async forgotEmailOrPassword(req, res) {
    const { email } = req.body; // Assuming email is used to identify the user
    try {
      await AuthService.forgotEmailOrPassword(email);
      res.status(200).json({
        success: true,
        message: "Instructions sent to your email",
      });
    } catch (error) {
      console.error("Error in forgotEmailOrPassword:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  static async logout(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new ApiError("Unauthorized", 401);

      await authService.logout(userId);

      // Hapus cookie
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return ApiResponse.success(res, null, {
        message: "Logout successful",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
