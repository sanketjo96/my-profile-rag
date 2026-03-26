import ingestController from "./ingest.controller.js";
import { ingestUploadSchema } from "../schema/ingest.js";

export default async function ingestRoutes(fastify) {
  fastify.post(
    "/upload",
    {
      schema: ingestUploadSchema,
      // multipart/form-data parsing may leave `request.body` undefined.
      // Ensure Ajv sees an object, without touching the `file` field itself.
      preValidation: async (request) => {
        if (!request.body) request.body = {};
      },
    },
    ingestController
  );
}

