import mongoose from 'mongoose';
import AnimeServices from '../services/Anime.js';

class AnimeController {
  static create = (req, res, next) => {
    const { character, anime, quote } = req.body;

    if (character.length < 3) return res.status(422).json({ msg: 'Enter more than 3 characters' });
    if (anime.length < 3) return res.status(422).json({ msg: 'Enter more than 3 characters' });
    if (quote.length < 5) return res.status(422).json({ msg: 'Enter more than 5 characters' });

    const newAnime = { character, anime, quote };

    return AnimeServices.create(newAnime)
      .then(res.status(201).json({ Anime: newAnime }))
      .catch(err => next(err));
  };

  static getAnimeByUser = async (req, res, next) => {
    try {
      const anime = await AnimeServices.getAnimeByUser(req.params.id);
      if (!anime) return res.status(404).json({ msg: 'Anime not found' });
      return res.status(200).json({ anime });
    } catch (err) {
      return next(err);
    }
  };

  static getAllAnimes = async (req, res, next) => {
    try {
      const anime = await AnimeServices.getAll();
      if (anime.lengh === 0 || !anime) return res.status(404).json({ msg: 'No animes registration' });
      return res.status(200).json({ anime });
    } catch (err) {
      return next(err);
    }
  };

  static updateAnime = async (req, res, next) => {
    const { id } = req.params;
    const { character, anime, quote } = req.body;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: 'Provide a valid ID for anime' });

    const animeExist = await AnimeServices.getByUser(id);

    if (!animeExist) return res.status(404).json({ msg: 'Anime not found' });
    if (character.length < 3) return res.status(422).json({ msg: 'Enter more than 3 characters' });
    if (anime.length < 3) return res.status(422).json({ msg: 'Enter more than 3 characters' });
    if (quote.length < 5) return res.status(422).json({ msg: 'Enter more than 5 characters' });

    const updateAnime = { character, anime, quote };

    return AnimeServices.update(id, updateAnime)
      .then(res.status(200).json({ updateAnime }))
      .catch(err => next(err));
  };

  static deleteAnime = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ msg: 'Provide a valid ID for anime' });

    const animeExists = await AnimeServices.getByUser(id);

    if (!animeExists) return res.status(404).json({ msg: 'Anime not found' });

    return AnimeServices.delete(id)
      .then(res.status(200).json({ msg: 'Anime successfully removed' }))
      .catch(err => next(err));
  };
}

export default AnimeController;
