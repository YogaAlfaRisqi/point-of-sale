const prisma = require("../config/database");

class UserRepository {
  static async create(userData) {
    try {
      return prisma.user.create({
        data: userData,
      });
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async update(userId, updateData) {
    try {
      return prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async delete(userId) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async findByUsername(username) {
    return prisma.user.findUnique({ where: { username } });
  }

  static async findByIdentifier(identifier) {
    return prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
  }

  static async findAll(filters = {}) {
    try {
      const { page = 1, limit = 10, includeRoles = false } = filters;

      const skip = (page - 1) * limit;

      // const include = includeRoles
      //   ? { userRoles: { include: { role: true } } }
      //   : undefined;

      
        const users = await prisma.user.findMany({
          // skip,
          take: limit,
          // include,
          orderBy: { createdAt: "desc" },
        });
      

      const total = await prisma.user.count();

      return {
        data: users,
        total,
      };
    } catch (error) {
      console.error("🔥 Error fetching users:", error);
      throw new Error(`Database error while fetching users: ${error.message}`);
    }
  }

  static async findById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true },
        },
        sales: true,
        sessions: true,
      },
    });
  }
}

module.exports = UserRepository;
