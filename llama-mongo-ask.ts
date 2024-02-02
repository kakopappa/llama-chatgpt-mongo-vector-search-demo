/* eslint-disable turbo/no-undeclared-env-vars */
import * as dotenv from "dotenv";
import {
  MongoDBAtlasVectorSearch,
  VectorStoreIndex,
  serviceContextFromDefaults
} from "llamaindex";
import { MongoClient } from "mongodb";
import { checkRequiredEnvVars } from "./shared.ts";

dotenv.config();

const mongoUri = String(process.env.MONGO_URI);
const databaseName = String(process.env.MONGODB_DATABASE);
const vectorCollectionName = String(process.env.MONGODB_VECTORS);
const indexName = String(process.env.MONGODB_VECTOR_INDEX);

async function loadAndAsk() {
 const client = new MongoClient(mongoUri);
 const serviceContext = serviceContextFromDefaults();

  // create Atlas as a vector store
  const vectorStore = new MongoDBAtlasVectorSearch({
    mongodbClient: client,
    dbName: databaseName,
    collectionName: vectorCollectionName, // this is where your embeddings will be stored
    indexName: indexName, // this is the name of the index you will need to create
  });

  const index = await VectorStoreIndex.fromVectorStore(vectorStore, serviceContext);

  const retriever = index.asRetriever({ similarityTopK: 20 });
  const queryEngine = index.asQueryEngine({ retriever });
  const result = await queryEngine.query({
    query: "where did author wanted to work at?", 
  });

  // What did the author do in college?

  console.log(result.response);
  await client.close();

  
}

(async () => {
  checkRequiredEnvVars();
  await loadAndAsk();
})();
