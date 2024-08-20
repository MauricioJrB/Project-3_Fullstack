import express from 'express';
import db from './config/dbConnect.js';
import routerConfig from './config/router.js';
import middlewares from './config/middlewares.js';

const app = express();

app.db = db;
middlewares(app);
routerConfig(app);

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome API Animes' });
});

export default app;
