import { Hono } from 'hono';
import Redis from 'ioredis';

const app = new Hono();
const redis = new Redis();

// Define rate limit settings
const MAX_REQUESTS = 100;  // Max number of requests per time window
const WINDOW_TIME = 60 * 1000;  // Time window in milliseconds (1 minute)

// Rate limiter middleware
async function rateLimiter(c: any, next: () => void) {
  const ip = c.req.ip;  // Get IP address from the request
  const key = `rate_limit:${ip}`;
  console.log(ip,"hello shariq ...")
  const currentTime = Date.now();
  const windowStartTime = currentTime - WINDOW_TIME;
  const requestCount = await redis.zcount(key, windowStartTime, currentTime);
  if (requestCount >= MAX_REQUESTS) {
    return c.json({ message: 'Rate limit exceeded. Please try again later.' }, 429);
  }
  await redis.zadd(key, currentTime, currentTime.toString());
  await redis.expire(key, WINDOW_TIME / 1000); 

  next();
}

app.use('/todo/:id', rateLimiter);

// API endpoint example
app.get('/todo/:id', (c) => {
  console.log("hello sharuq khan")
  const todoId = c.req.param('id');
  return c.json({
    id: todoId,
    title: 'Sample Todo',
    description: 'This is a sample todo',
    completed: false,
  });
 
});

export default app;
