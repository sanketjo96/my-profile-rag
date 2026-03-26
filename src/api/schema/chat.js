export const chatSchema = {
    tags: ["Chat"],
    summary: "Live chat connection to system",
    description: "This is to connect with context aware LLM. Context is personal resume",
    body: {
      type: "object",
      properties: {
        query: { type: "string", description: "User prompt"},
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          response: { type: "string" },
        },
        required: ["response"],
      },
      400: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
        required: ["error"],
      },
      415: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
        required: ["error"],
      },
    },
  };
  
  