import fs from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

import { ingestQueue } from "../../queues/ingest.queue.js";

function sanitizeFilename(name) {
  const base = path.basename(name);
  return base.replace(/[^\w.\-]+/g, "_");
}

export async function saveUploadedPdf({ stream, userId, source, originalName }) {
  const uploadsDir = fileURLToPath(new URL("../../../uploads", import.meta.url));
  await mkdir(uploadsDir, { recursive: true });

  const safeName = sanitizeFilename(originalName || "file.pdf");
  let fileName = `${Date.now()}-${safeName}`;
  let absolutePath = path.join(uploadsDir, fileName);
  let job = null;

  try {
    await pipeline(stream, fs.createWriteStream(absolutePath, { flags: "wx" }));

    // queue the job
    job = await ingestQueue.add('ingest-job', {
      filePath: absolutePath,
      status: 'pending',
      userId,
      source,
    });
    console.log("✅ Job added:", job.id);

  } catch (err) {
    if (err && err.code === "EEXIST") {
      fileName = `${Date.now()}-${Math.random().toString(16).slice(2)}-${safeName}`;
      absolutePath = path.join(uploadsDir, fileName);
      await pipeline(stream, fs.createWriteStream(absolutePath, { flags: "wx" }));
    } else {
      throw err;
    }
  }

  return {
    fileName,
    filePath: path.posix.join("/uploads", fileName),
    jobId: job.id,
  };
}

