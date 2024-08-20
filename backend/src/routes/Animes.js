import express from 'express';
import AnimeController from '../controllers/Anime.js';

const router = express.Router();

router.get('/', AnimeController.getAllAnimes);
router.get('/:id', AnimeController.getAnimeByUser);
router.post('/', AnimeController.create);
router.put('/:id', AnimeController.updateAnime);
router.delete('/:id', AnimeController.deleteAnime);

export default router;
