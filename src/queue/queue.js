import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js"

export const uploadQueue = new Queue("uploadQueue", {
    connection: redisConnection,
});