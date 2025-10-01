

class UserController {
  static async getAllUsers(req, res) {
    try {
      // Sementara dummy data, nanti bisa diganti Prisma/DB
      const users = [
        { id: 1, name: 'John Doe', role: 'ADMIN' },
        { id: 2, name: 'Jane Smith', role: 'CASHIER' }
      ];

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
}

module.exports = UserController;
