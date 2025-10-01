const UserService = require('../services/UserService');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }

  static async getUserById(req, res) {
    const userId = parseInt(req.params.id, 10);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                userRoles: {    
                    include: {
                        role: true
                    },

                },
                sales: true,
                sessions: true,
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }

    catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
    }

}

module.exports = UserController;
