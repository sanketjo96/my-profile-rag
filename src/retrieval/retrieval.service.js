// src/retrieval/retrieval.service.js
import { QdrantClient } from "@qdrant/js-client-rest";
import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";

import { env } from "../config/env.js";

const COLLECTION = "documents";

export async function retrieveContext(query) {
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: env.OPENAI_API_KEY
    });


    const vectorDb = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: env.QDRANT_URL,
        apiKey: env.QDRANT_API_KEY,
        collectionName: COLLECTION
    })

    const results = await vectorDb.similaritySearch(
        query,
        3
    );

   
    return results.map((r) => r.pageContent).join("\n");
}