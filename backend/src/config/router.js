import express from 'express';
import userRoutes from '../routes/Users.js';

const routerConfig = app => {
  const protectedRouter = express.Router();

  protectedRouter.use('/users', userRoutes);

  app.use('/api', protectedRouter);
};

export default routerConfig;
