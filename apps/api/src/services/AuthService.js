const userRepository = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

class AuthService {
  static async register({ username, email, password }) {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      throw new AppError(
        "Email is already regitered. Please login instead.",
        400
      );
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new AppError(
        "Username is already taken. Please choose another one.",
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      username,
      email,
      password: hashedPassword,
    };

    const newUser = await userRepository.create(userData);

    return newUser;
  }

  static async login({identifier, password}) {
        const user = await userRepository.findByIdentifier(identifier);

        if(!user){
            throw new AppError("User Not Found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new AppError("Invalid password");
        }

        // Generate JWT


        return {
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
        }
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
}

module.exports = AuthService;
