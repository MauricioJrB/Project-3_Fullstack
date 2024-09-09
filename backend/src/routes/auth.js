import express from 'express';
import UserController from '../controllers/User.js';
import validate from '../middlewares/sanitzers.js';

const router = express.Router();
router.post('/signin', validate('createUser'), UserController.signIn);
router.post('/signup', validate('createUser'), UserController.signUp);

export default router;
