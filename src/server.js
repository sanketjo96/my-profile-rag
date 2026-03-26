import Fastify from "fastify";
import pino from "pino";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import multipart from "@fastify/multipart";

import { env } from "./config/env.js";
import swaggerConfig from "./config/swagger.js";
import api from "./api/index.js";


const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
});

const app = Fastify({ loggerInstance: logger });

const stop = async () => {
  app.log.info("server stopping");
  await app.close();
};

const start = async () => {
  await app.register(swagger, swaggerConfig);
  await app.register(swaggerUi, {
    routePrefix: "/docs",
  });

  // Keep multipart handling default so `request.file()` works as expected.
  // Swagger can still show the multipart `file` field via the route schema.
  await app.register(multipart);

  await app.register(api, { prefix: "/api" });


  const address = await app.listen({ port: env.PORT, host: env.HOST });
  app.log.info({ address }, "server started");
};

const signals = ["SIGINT", "SIGTERM"];
for (const signal of signals) {
  process.on(signal, async () => {
    try {
      await stop();
    } finally {
      process.exit(0);
    }
  });
}

try {
  await start();
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

