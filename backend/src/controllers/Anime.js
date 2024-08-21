import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import AnimeServices from '../services/Anime.js';
import ValidationError from '../errors/ValidationError.js';
import AnimeNotFound from '../errors/AnimeNotFound.js';

class AnimeController {
  static createAnime = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { character, anime, quote, owner } = req.body;

    const newAnime = { character, anime, quote, owner };

    return AnimeServices.create(newAnime)
      .then(res.status(201).json({ Anime: newAnime }))
      .catch(err => next(err));
  };

  static getAnimeByUser = async (req, res, next) => {
    const userId = req.params.id;

    return AnimeServices.getByUser(userId)
      .then(anime => {
        if (!anime || anime.length === 0) return next(new AnimeNotFound('Anime not found'));
        return res.status(200).json({ anime });
      })
      .catch(err => next(err));
  };

  static getAllAnimes = async (req, res, next) => {
    await AnimeServices.getAll()
      .then(anime => {
        if (anime.length === 0 || !anime) return res.status(404).json({ msg: 'No animes registration' });
        return res.status(200).json({ anime });
      })
      .catch(err => next(err));
  };

  static updateAnime = async (req, res, next) => {
    const userId = req.params.id;
    const { character, anime, quote } = req.body;

    if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ msg: 'Provide a valid ID for anime' });

    const animeExist = await AnimeServices.getByUser(userId);

    if (!animeExist) return next(new AnimeNotFound('Anime not found'));
    if (character.length < 3) return next(new ValidationError('Enter more than 3 characters'));
    if (anime.length < 3) return next(new ValidationError('Enter more than 3 characters'));
    if (quote.length < 5) return next(new ValidationError('Enter more than 5 characters'));

    const updateAnime = { character, anime, quote };

    return AnimeServices.update(userId, updateAnime)
      .then(res.status(200).json({ updateAnime }))
      .catch(err => next(err));
  };

  static deleteAnime = async (req, res, next) => {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) return next(new ValidationError('Provide a valid ID for anime'));

    const animeExists = await AnimeServices.getByUser(userId);

    if (!animeExists) return res.status(404).json({ msg: 'Anime not found' });

    return AnimeServices.delete(userId)
      .then(res.status(200).json({ msg: 'Anime successfully removed' }))
      .catch(err => next(err));
  };
}

export default AnimeController;
