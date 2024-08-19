import bodyParser from 'body-parser';

const middlewares = app => {
  app.use(bodyParser.json());
  app.use((err, req, res, next) => {
    const { name, message, stack } = err;
    if (name === 'AuthError') res.status(403).json({ error: message });
    else if (name === 'UserNotFound') res.status(404).json({ error: message });
    else res.status(500).json({ name, message, stack });
    next();
  });
};

export default middlewares;
