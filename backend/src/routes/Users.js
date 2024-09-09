import express from 'express';
import UserController from '../controllers/User.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

export default router;
