import chatController from "./chat.controller.js";
import { chatSchema } from "../schema/chat.js";

export default async function chatRoutes(fastify) {
    fastify.post(
      "/",
      {
        schema: chatSchema,
      },
      chatController
    );
  }
  