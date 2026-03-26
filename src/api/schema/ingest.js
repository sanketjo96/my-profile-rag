export const ingestUploadSchema = {
  tags: ["Ingest"],
  summary: "Upload a PDF file",
  description: "Uploads a PDF and stores it in the server `uploads` folder.",
  headers: {
    type: "object",
    required: ["x-user-id"],
    properties: {
      "x-user-id": { type: "string" },
    },
  },
  consumes: ["multipart/form-data"],
  body: {
    type: "object",
    properties: {
      file: { type: "string", format: "binary", description: "PDF file" },
      source: { type: "string", default: "general" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        filePath: { type: "string" },
        fileName: { type: "string" },
        userId: { type: "string" },
        source: { type: "string" },
        jobId: { type: "string" },
      },
      required: ["filePath", "fileName", "userId", "source", "jobId"],
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

