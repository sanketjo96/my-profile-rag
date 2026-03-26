import { generateAnswer } from "../../retrieval/llm.service.js";
import { retrieveContext } from "../../retrieval/retrieval.service.js";

export default async function chatController(request, reply) {
    const { query } = request.body;

    const context = await retrieveContext(query);

    try {
        const response = await generateAnswer(query, context);
        reply.code(201);
        return reply.send({response});
    } catch(e) {
        reply.code(500);
        return { error: "Internal server error" };
    }
}