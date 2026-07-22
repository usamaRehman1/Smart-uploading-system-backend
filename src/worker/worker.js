import { Worker } from "bullmq";
import fs from "fs";
import { redisConnection } from "../config/redis.js";
import { cloudinary } from "../config/cloudinary.js";
import { UploadModel } from "../model/index.js";
import { connectDB } from "../config/connectionDB.js";

await connectDB();

const worker = new Worker(
  "uploadQueue",

  async (job) => {
    try {
      console.log("Job Data:", job.data);

      // Simulate delay (optional)
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(job.data.path);

      // Update MongoDB
      await UploadModel.findByIdAndUpdate(job.data.id, {
        cloudinaryUrl: result.secure_url,
        status: "uploaded",
      });

      // Delete local file
      if (fs.existsSync(job.data.path)) {
        fs.unlinkSync(job.data.path);
      }

      console.log("Upload completed successfully.");
    } catch (error) {
      console.error("Worker Error:", error);

      // Save failure status
      await UploadModel.findByIdAndUpdate(job.data.id, {
        status: "failed",
      });

      throw error; // BullMQ will retry if retries are configured
    }
  },

  {
    connection: redisConnection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed.`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed.`);
  console.error(err.message);
});