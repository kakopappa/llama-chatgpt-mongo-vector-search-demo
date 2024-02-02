# llamaindex ChatGPT MongoDb Vector Search demo

This is an example of how to train using llamaindex, chatgpt, and then store the document embeddings in Mongodb Atlas Vector Search and ask questions about the content.

**You need ChatGPT and Mongodb Atlas API Keys** They are free.

1. Login to Mongodb Atlas and create a database: **llama**. Copy the connection string presented at the end.
1. rename .env.demo to .env and put the `OPENAI_API_KEY` key and `MONGO_URI`  (from step 1)
2. run `ts-node llama-mongo-train.ts`
3. login to  Mongodb Atlas and create the Vector index on `embedding`. 

`
{
    "fields": [
      {
        "type": "vector",
        "path": "embedding",
        "numDimensions": 1536,
        "similarity": "euclidean"
      }
    ]
}
`

4. run `ts-node llama-mongo-ask.ts` to ask questions. question is inside

   
