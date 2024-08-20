import express from 'express';
import userRoutes from '../routes/users.js';
import animeRoutes from '../routes/Animes.js';

const routerConfig = app => {
  const protectedRouter = express.Router();

  protectedRouter.use('/users', userRoutes);
  protectedRouter.use('/animes', animeRoutes);

  app.use('/api', protectedRouter);
};

export default routerConfig;
