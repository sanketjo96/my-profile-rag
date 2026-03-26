import { Worker } from "bullmq";
import { env } from "../src/config/env.js";
import { QUEUE_NAMES } from "../src/queues/queue.constants.js";
import { runIngestionPipeline } from "../src/ingetion/pipeline.js";

const worker = new Worker(
    QUEUE_NAMES.INGEST,
    async (job) => {
        const { filePath, userId, source } = job.data;
        console.log("📥 Processing job:", job.id);
        console.log("Data:", job.data);
        await runIngestionPipeline(filePath, userId, source);
        console.log("✅ Done:", job.id);
    },
    {
        connection: {
            url: env.UPSTASH_REDIS_TCP,
        },
        concurrency: 2,
    }
);

// optional logs
worker.on("ready", () => {
    console.log("🚀 Worker ready");
});

worker.on("completed", (job) => {
    console.log("🎉 Completed:", job.id);
});

worker.on("failed", (job, err) => {
    console.log("❌ Failed:", job?.id, err.message);
});