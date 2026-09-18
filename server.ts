import express from "express";
import cors from "cors";
import { streamText, convertToModelMessages } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { UIMessage } from "ai";
import dotenv from "dotenv";

dotenv.config();

// Create a Groq provider using the OpenAI-compatible interface
const groq = createOpenAICompatible({
  name: "groq",
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
const model = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  console.log("Backend received request:", req.body.messages?.length, "messages");
  const { messages }: { messages: UIMessage[] } = req.body;

  const result = streamText({
    model: groq(model),
    messages: await convertToModelMessages(messages),
    system: "You are a cloud infrastructure assistant. Help users check service status and propose safe actions. Begin every response with 'LLM ACTIVE:'",
  });

  await result.pipeUIMessageStreamToResponse(res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});