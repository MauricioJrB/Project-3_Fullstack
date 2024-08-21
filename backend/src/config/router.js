import express from 'express';
import userRoutes from '../routes/users.js';
import animeRoutes from '../routes/animes.js';
import authRoutes from '../routes/auth.js';
import passportConfig from './passport.js';

const routerConfig = app => {
  app.use('/auth', authRoutes);
  const protectedRouter = express.Router();

  protectedRouter.use('/users', userRoutes);
  protectedRouter.use('/animes', animeRoutes);

  app.use('/api', passportConfig(), protectedRouter);
};

export default routerConfig;
