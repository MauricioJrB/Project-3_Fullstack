import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

export const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  password: undefined,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', err => {
  console.error('Redis error', err);
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5,
});

export const rateLimiter = async (req, res, next) => {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (error) {
    return res.status(429).json({ msg: 'Too many requests' });
  }
};
