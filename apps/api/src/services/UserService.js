const UserRepository = require('../repositories/UserRepository');

class UserService {
  static async getAllUsers() {
    const users = await UserRepository.findAll();

    // Mapping biar lebih clean, roles langsung array string
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.userRoles.map(ur => ur.role.name),
      salesCount: user.sales.length, //agregasi
    }));
  }
}

module.exports = UserService;
