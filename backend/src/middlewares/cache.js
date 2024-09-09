import { redisClient } from './rateLimiter.js';

const cache = (req, res, next) => {
  const key = req.originalUrl;

  redisClient.get(key, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        redisClient.setex(key, 3600, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};

export default cache;
