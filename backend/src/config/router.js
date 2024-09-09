import express from 'express';
import userRoutes from '../routes/users.js';
import animeRoutes from '../routes/animes.js';
import authRoutes from '../routes/auth.js';
import passportConfig from '../middlewares/passport.js';
import cache from '../middlewares/cache.js';
import { rateLimiter } from '../middlewares/rateLimiter.js';

const routerConfig = app => {
  app.use('/auth', authRoutes);
  const protectedRouter = express.Router();

  protectedRouter.use('/users', rateLimiter, cache, userRoutes);
  protectedRouter.use('/animes', rateLimiter, cache, animeRoutes);

  app.use('/api', passportConfig(), protectedRouter);
};

export default routerConfig;
