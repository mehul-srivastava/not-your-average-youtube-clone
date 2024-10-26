import Redis from "ioredis";

declare global {
  var redis: Redis | undefined;
}

const redis = globalThis.redis || new Redis(process.env.REDIS_URL!);
if (process.env.NODE_ENV !== "production") globalThis.redis = redis;

export default redis;
