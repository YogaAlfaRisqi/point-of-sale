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

  static async findById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true }
        },
        sales: true,
        sessions: true,
      },
    });
  }

  static async update(userId, updateData) {
    return prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }

  static async delete(userId) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  
}

module.exports = UserRepository;
