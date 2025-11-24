import Redis from "ioredis";

const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
    });

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err:unknown) => {
  console.log("Redis Client Error:", err);
});

export default redisClient;
