import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV ?? "production";
const PORT_RAW = process.env.PORT ?? "3000";
const HOST = process.env.HOST ?? "0.0.0.0";
const UPSTASH_REDIS_TCP = process.env.UPSTASH_REDIS_TCP ?? "";

const OPENAI_API_KEY=process.env.OPENAI_API_KEY ?? "";

const QDRANT_URL = process.env.QDRANT_URL ?? "";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY ?? "";

const PORT = Number(PORT_RAW);
if (!Number.isInteger(PORT) || PORT <= 0) {
  throw new Error(`Invalid PORT value: ${PORT_RAW}`);
}

export const env = { NODE_ENV, PORT, HOST, UPSTASH_REDIS_TCP, QDRANT_URL, QDRANT_API_KEY, OPENAI_API_KEY };

