import express from "express";
import cors from "cors";
import { streamText, convertToModelMessages } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { UIMessage } from "ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw new Error("GROQ_API_KEY is required. Add it to your .env file.");
}

const groq = createOpenAICompatible({
  name: "groq",
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});
const model = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const messages = req.body.messages as UIMessage[] | undefined;
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: "A messages array is required." });
    return;
  }

  const result = streamText({
    model: groq(model),
    messages: await convertToModelMessages(messages),
    system:
      "You are a cloud infrastructure assistant. Help users check service status and propose safe actions. Begin every response with 'LLM ACTIVE:'.",
  });

  await result.pipeUIMessageStreamToResponse(res);
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
