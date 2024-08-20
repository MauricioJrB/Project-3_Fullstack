import AnimeModel from '../models/Anime.js';

class AnimeServices {
  static async create(data) {
    const anime = new AnimeModel(data);
    return anime.save();
  }

  static async getByUser(id) {
    return AnimeModel.find({ owner: id }).sort('-createdAt');
  }

  static async getAll() {
    return AnimeModel.find();
  }

  static async update(animeId, newData) {
    return AnimeModel.findByIdAndUpdate(animeId, newData, { new: true });
  }

  static async delete(id) {
    return AnimeModel.findByIdAndDelete(id);
  }
}

export default AnimeServices;
