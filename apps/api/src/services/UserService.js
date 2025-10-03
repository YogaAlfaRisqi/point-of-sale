const UserRepository = require('../repositories/UserRepository');

class UserService {
  static async getAllUsers() {
    const users = await UserRepository.findAll();

    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.userRoles.map(ur => ur.role.name),
      salesCount: user.sales.length, //agregasi
    }));
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
