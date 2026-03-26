import { Queue } from "bullmq";
import { env } from "../src/config/env.js";
import { QUEUE_NAMES } from "../src/queues/queue.constants.js";

const queue = new Queue(QUEUE_NAMES.INGEST, {
  connection: {
    url: env.UPSTASH_REDIS_TCP,
  },
});

async function addJob() {
  const job = await queue.add("ingest-job", {
    filePath: '',
    status: 'pending',
    userId: '',
    source: ''
});

  console.log("✅ Job added:", job.id);
  process.exit(0);
}

addJob();