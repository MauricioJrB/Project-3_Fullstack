/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import db from './config/dbConnect.js';
import routerConfig from './config/router.js';
import logger from './config/logger.js';

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.db = db;
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://localhost:3000',
  methods: 'GET, POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  logger.info(`Request ${req.method} ${req.url}`);
  next();
});

routerConfig(app);

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Welcome API Animes' });
});

app.use((req, res, next) => {
  res.setHeader('Content-Encoding', 'gzip');
  next();
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'AuthError') res.status(403).json({ error: message });
  else if (name === 'UserNotFound' || name === 'AnimeNotFound') res.status(404).json({ error: message });
  else if (name === 'ValidationError') res.status(422).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

export default app;
