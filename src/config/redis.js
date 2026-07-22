import IORedis from "ioredis"
import { ENV } from "../constant.js"

export const redisConnection = new IORedis({
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
  password: ENV.REDIS_PASSWORD,

  tls: {},
  maxRetriesPerRequest: null,
});

redisConnection.on("connect", () => {
  console.log("✅ Redis Connected");
});

redisConnection.on("ready", () => {
  console.log("✅ Redis Ready");
});

redisConnection.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

redisConnection.on("close", () => {
  console.log("⚠️ Redis Connection Closed");
});

redisConnection.on("reconnecting", () => {
  console.log("🔄 Redis Reconnecting...");
});