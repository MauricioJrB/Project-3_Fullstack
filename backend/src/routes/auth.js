import express from 'express';
import UserController from '../controllers/User.js';

const router = express.Router();
router.post('/signin', UserController.signIn);
router.post('/signup', UserController.create);

export default router;
