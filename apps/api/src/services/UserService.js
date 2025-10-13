const UserRepository = require("../../../../../catatuang/server/src/api/v1/repository/UserRepository");


class UserService {
  static async getAllUsers(page, limit) {
    return UserRepository.findAll({ page, limit });
  }

  static async getUserById(userId) {
    const user = await UserRepository.findById(userId);
    return user;
  }

  static async updateUser(userId, updateData) {
    const user = await UserRepository.update(userId, updateData);
    return user;
  }

  static async deleteUser(userId) {
    const user = await UserRepository.delete(userId);
    return user;
  }

}

module.exports = UserService;
