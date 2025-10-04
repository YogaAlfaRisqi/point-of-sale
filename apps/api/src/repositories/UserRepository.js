const prisma = require('../../prisma/client/client');

class UserRepository {

  // Create a new user
  async createUser(userData) {
    try{
      return prisma.user.create({
        data: userData,
      });
    }catch(error){
      throw new Error ('Error creating user: ' + error.message);    
    }
  }

  // Update an existing user
  async updateUser(userId, updateData){
    try{
      return prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    }catch(error){
      throw new Error ('Error updating user: ' + error.message);    
    }
  }

  // Delete a user by ID
  async delete(userId) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }

  // Find All users with their roles and sales
  async findAll() {
    return prisma.user.findMany({
      include: {
        userRoles: {
          include: { role: true }
        },
        sales: true,
      },
    });
  }

  // Find user by ID with roles and sales
  async findById(userId) {
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

}

module.exports = UserRepository;
