import { saveUploadedPdf } from "./ingest.service.js";

export default async function ingestController(request, reply) {
  const userIdHeader = request.headers["x-user-id"];
  if (!userIdHeader || Array.isArray(userIdHeader)) {
    reply.code(400);
    return { error: "Missing required header: x-user-id" };
  }

  const userId = String(userIdHeader);
  const filePart = await request.file();
  const sourceRaw = filePart?.fields?.source;
  let source = "general";

  if (sourceRaw !== undefined && sourceRaw !== null) {
    if (typeof sourceRaw === "string" || typeof sourceRaw === "number") {
      source = String(sourceRaw);
    } else if (typeof sourceRaw === "object" && "value" in sourceRaw) {
      source = String(sourceRaw.value);
    } else {
      source = String(sourceRaw);
    }
  }

  if (filePart) {
    const { file, filename, mimetype } = filePart;
    const originalName = filename ?? "upload.pdf";

    const isPdf =
      mimetype === "application/pdf" ||
      String(originalName).toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      reply.code(415);
      return { error: "Only PDF files are allowed" };
    }

    const { filePath, fileName, jobId } = await saveUploadedPdf({
      stream: file,
      userId,
      source,
      originalName,
    });

    reply.code(201);
    return { filePath, fileName, userId, source, jobId };
  }

  reply.code(400);
  return { error: "Missing file field" };
}