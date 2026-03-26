import { Queue } from "bullmq";
import { QUEUE_NAMES } from "./queue.constants.js";
import { env } from "../config/env.js";

export const ingestQueue = new Queue(QUEUE_NAMES.INGEST, {
  connection: {
    url: env.UPSTASH_REDIS_TCP
  },
});