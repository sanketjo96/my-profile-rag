import { healthSchema } from "../schema/health.js";

export default async function healthRoutes(fastify) {
  fastify.get("/", { schema: healthSchema }, async () => ({ status: "ok" }));
}

