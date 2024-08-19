import express from 'express';
import UserController from '../controllers/User.js';

const router = express.Router();

router.get('/teste', (req, res) => {
  res.status(200).json({ msg: 'Rota teste' });
});
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.post('/', UserController.create);

export default router;
