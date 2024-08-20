import UserModel from '../models/User.js';

class UserServices {
  static async create(data) {
    const user = new UserModel(data);
    return user.save();
  }

  static async getUserById(id) {
    return UserModel.findById(id);
  }

  static async getByEmail(filter = {}) {
    return UserModel.findOne(filter);
  }

  static async getAll() {
    return UserModel.find();
  }
}

export default UserServices;
