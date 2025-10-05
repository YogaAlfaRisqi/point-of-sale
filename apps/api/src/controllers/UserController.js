const userService = require('../services/UserService');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await userService.getAllUsers(req.body);
      res.status(200).json({
         success: true,
         message: "List of all users",
         data: result
        });
    } catch (error) {
      next(error);
    }
  }

//    static async getUserById(req, res) {
//     const userId = parseInt(req.params.id, 10);
//     try {
//         const user = await UserService.user.findUnique();
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: user
//         });
//     }catch (error) {
//         console.error("Error in getUserById:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
//     }

//      static async updateUser(req, res) {
//         // TODO: Implementasi update user
//         const userId = parseInt(req.params.id, 10);
//         const { name, email } = req.body;
//         try {
//             const user = await UserService.updateUser(userId, { name, email });
//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "User not found"
//                 });
//             }
//             res.status(200).json({
//                 success: true,
//                 message: "User updated successfully",
//                 data: user
//             });
//         } catch (error) {

//             console.error("Error in updateUser:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Internal server error"
//             });
//         }
//     }

//      static async deleteUser(req, res) {
//         // TODO: Implementasi delete user
//         const userId = parseInt(req.params.id, 10);
//         try {
//             const user = await UserService.deleteUser(userId);
//             if (!user) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "User not found"
//                 });
//             }
//             res.status(200).json({
//                 success: true,
//                 message: "User deleted successfully"
//             });
//         } catch (error) {

//             console.error("Error in deleteUser:", error);
//             res.status(500).json({
//                 success: false,
//                 message: "Internal server error"
//             });
//         }

//     }


}

module.exports = UserController;
