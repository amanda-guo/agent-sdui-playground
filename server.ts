import express from "express";
import cors from "cors";
import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import type { UIMessage } from "ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages }: { messages: UIMessage[] } = req.body;

  const result = streamText({
    model: openai("gpt-4o"),
    messages: await convertToModelMessages(messages),
    system: "You are a cloud infrastructure assistant. Help users check service status and propose safe actions.",
  });

  return result.toUIMessageStreamResponse();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});