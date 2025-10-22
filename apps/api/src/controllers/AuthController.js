const { role } = require("../config/database");
const authService = require("../services/AuthService");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, name, email, password } = req.body;

      if (!username || !name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Username, name, email, and password are required",
        });
      }

      const newUser = await authService.register({ username, name, email, password });

      const payload ={
        id:newUser.id,
        role:newUser.role,
        email:newUser.email
      }

      const accessToken = generateAccessToken(payload);
      // const refreshToken = generateRefreshToken(payload);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }


  static async login(req, res,next) {
      try {
        const { identifier, password } = req.body;

        if(!identifier||!password){
            return res.status(400).json({
                success:false,
                message:"Identifier (username or email) and password are required",
            });
        }

        const result = await authService.login({identifier,password});

        res.status(200).json({
            success:true,
            message:"Login Successful",
            data:result,
        });
      }catch(error){
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

  static async logout(req, res) {
    try {
      await AuthService.logout({req, res});

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Error in logout:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = AuthController;
