const AuthService = require('../services/AuthService');

class AuthController {
    // AuthController methods would go here
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.login(email, password);
            res.status(200).json({
                success: true,
                message: "Login successful",
                token: token
            });
        } catch (error) {
            console.error("Error in login:", error);

            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const user = await AuthService.register({ username, email, password });
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: user
            });
        }
        catch (error) {
            console.error("Error in register:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }

    static async resetPassword(req, res) {
        const { email } = req.body;
        try {
            await AuthService.resetPassword(email);
            res.status(200).json({
                success: true,
                message: "Password reset email sent"
            });
        }
        catch (error) {
            console.error("Error in resetPassword:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }

    static async forgotEmailOrPassword(req, res) {
        const { email } = req.body; // Assuming email is used to identify the user
        try {
            await AuthService.forgotEmailOrPassword(email); 
            res.status(200).json({
                success: true,
                message: "Instructions sent to your email"
            });
        }
        catch (error) {
            console.error("Error in forgotEmailOrPassword:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    


    static async logout(req, res) {
        try {
            await AuthService.logout(req.user);
            
            res.status(200).json({
                success: true,
                message: "Logout successful"
            });
        }
        catch (error) {
            console.error("Error in logout:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }

}

module.exports = AuthController;