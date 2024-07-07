// import { OpenAIApi, Configuration } from "openai-edge";

// const config = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(config);

// export async function getEmbeddings(text: string) {
//   try {
//     const response = await openai.createEmbedding({
//       model: "text-embedding-ada-002",
//       input: text.replace(/\n/g, " "),
//     });
//     const result = await response.json();
//     console.log(result)
//     return result.data[0].embedding as number[];
//   } catch (error) {
//     console.log("error calling openai embeddings api", error);
//     throw error;
//   }
// }
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN)

export async function getEmbeddings(text: string) {
  try {
    // Load the model and tokenizer
    const response = await hf.featureExtraction({
      model: "intfloat/e5-small-v2",
      inputs: text
    })
    const embeddings = response
    console.log(embeddings)
    return embeddings;

  } catch (error) {
    throw error;
  }
}

