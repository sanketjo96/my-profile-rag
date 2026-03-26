import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import OpenAI from "openai";
import { env } from "../config/env.js";

import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";

export async function runIngestionPipeline(filePath, userId, source) {
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();


    /* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 200,
    });

    const chunks = await textSplitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: env.OPENAI_API_KEY
    });

    const dbresponse = await QdrantVectorStore.fromDocuments(chunks, embeddings, {
        url: env.QDRANT_URL,
        apiKey: env.QDRANT_API_KEY,
        collectionName: "documents"
    });

    console.log('indexing of document is done')
}