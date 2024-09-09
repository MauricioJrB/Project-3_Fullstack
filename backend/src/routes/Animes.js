import express from 'express';
import AnimeController from '../controllers/Anime.js';
import validate from '../middlewares/sanitzers.js';

const router = express.Router();

router.get('/', AnimeController.getAllAnimes);
router.get('/:character', AnimeController.getAnimeByUser);
router.post('/', validate('createAnime'), AnimeController.createAnime);
router.put('/:id', validate('updateAnime'), AnimeController.updateAnime);
router.delete('/:id', AnimeController.deleteAnime);

export default router;
