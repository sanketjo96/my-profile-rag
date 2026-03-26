import chatRoutes from "./chat/chat.routes.js";
import healthRoutes from "./health/health.routes.js";
import ingestRoutes from "./ingest/ingest.routes.js";

export default async function api(fastify) {
  await fastify.register(healthRoutes, { prefix: "/health" });
  await fastify.register(ingestRoutes, { prefix: "/ingest" });
  await fastify.register(chatRoutes, { prefix: "/chat" });
}