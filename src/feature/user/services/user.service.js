import User from "../models/user.model.js";
import { UserNotFoundException, UserAlreadyExistsException } from "../exceptions/user.exception.js";

const UserService = {
  async getAllUsers() {
    return await User.getAll();
  },

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  },

  async createUser(data) {
    const existingUser = await User.findByEmail(data.email);
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }
    return await User.create(data);
  },

  async updateUser(id, data) {
    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return await User.update(id, data);
  },

  async deleteUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    await User.softDelete(id);
  },

  async unlockUser(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    await User.unlock(id);
  },

  async changePassword(id, data) {
    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    await User.changePassword(id, data.newPassword);
  }
};

export default UserService;