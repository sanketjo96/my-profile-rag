import { Redis } from "ioredis";
import { env } from "./env.js";

export const redis = new Redis(env.UPSTASH_REDIS_TCP, {
    // BullMQ requires this to properly handle blocking commands/retries.
    maxRetriesPerRequest: null,
    // Upstash connections are typically TLS-enabled.
    tls: {},
});