export const healthSchema = {
    description: "Health check",
        response: {
        200: {
            type: "object",
                properties: {
                status: { type: "string", example: "ok" },
            },
            required: ["status"],
          },
    },
}