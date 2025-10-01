const prisma = require('../../prisma/client/client');

class UserRepository {
  static async findAll() {
    return prisma.user.findMany({
      include: {
        userRoles: {
          include: { role: true }
        },
        sales: true,
      },
    });
  }
}

module.exports = UserRepository;
