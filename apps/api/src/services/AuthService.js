const userRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const prisma = require("../config/database");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const ApiResponse = require("../utils/ApiResponse");

class AuthService {
  static async register({ email, password, username, name }) {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      throw new ApiError(
        "Email is already regitered. Please login instead.",
        400
      );
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new ApiError(
        "Username is already taken. Please choose another one.",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username,
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await userRepository.create(userData);

    return newUser;
  }

  static async login({ identifier, password }) {

    const user = await userRepository.findByIdentifier(identifier);
    
    if (!user) {
      throw new ApiError("User Not Found",404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ApiError( "Invalid email or password",401);

    const payload = { id: user.id, email: user.email };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });
    // Generate JWT
    console.log("acces token :", accessToken);
    console.log("refresh token :", refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  static async resetPassword(req, res) {
    // Logic for password reset
    // generate reset token
    // send email with reset link
    // return success message
  }

  static async forgotEmailOrPassword(req, res) {
    // Logic for handling forgotten email or password
    // verify user identity
    // send email with instructions
    // return success message
  }

  static async logout(userId) {
    try {
      await userRepository.deleteUserById(userId);
      // return ApiResponse.success({
      //   message: "Logout successful",
      //   status: 200,
      // });
    } catch (error) {
      console.error("🔥 Error in logout:", error);
       throw new ApiError("Failed to logout", 500);
    }
  }
}

module.exports = AuthService;
