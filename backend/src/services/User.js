import UserModel from '../models/User.js';

class UserServices {
  static async create(data) {
    const user = new UserModel(data);
    return user.save();
  }

  static async getById(id) {
    return UserModel.findById(id);
  }

  static async getAll() {
    return UserModel.find();
  }
}

export default UserServices;
