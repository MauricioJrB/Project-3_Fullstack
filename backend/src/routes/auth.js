import express from 'express';
import UserController from '../controllers/User.js';
import validate from '../config/middlewares.js';

const router = express.Router();
router.post('/signin', validate('createUser'), UserController.signIn);
router.post('/signup', validate('createUser'), UserController.createUser);

export default router;
