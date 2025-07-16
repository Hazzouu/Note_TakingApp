import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
// const redis = new Redis({
//   url: 'https://fleet-honeybee-57858.upstash.io',
//   token: 'AeICAAIjcDE5ZDlkYjA4ZmUxNTk0ZWM1OGQ2OGFjNzA2MWM3ZDAxN3AxMA',
// })

// await redis.set("foo", "bar");
// await redis.get("foo");
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
export default ratelimit;




