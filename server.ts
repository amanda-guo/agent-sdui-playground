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
const apiKeyForLogging = apiKey;

const groq = createOpenAICompatible({
  name: "groq",
  apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});
const model = process.env.GROQ_MODEL ?? "openai/gpt-oss-120b";

const app = express();
app.use(cors());
app.use(express.json());

function logChatError(stage: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    `[api/chat] ${stage}: ${message.replaceAll(apiKeyForLogging, "[REDACTED]")}`,
  );
}

app.post("/api/chat", async (req, res) => {
  const messages = req.body.messages as UIMessage[] | undefined;
  if (!Array.isArray(messages)) {
    res.status(400).json({ error: "A messages array is required." });
    return;
  }

  console.info(`[api/chat] Received ${messages.length} messages using model ${model}`);

  try {
    const modelMessages = await convertToModelMessages(messages, {
      ignoreIncompleteToolCalls: true,
    });
    const groqMessages = modelMessages.map((message) => {
      if (message.role !== "assistant" || typeof message.content === "string") {
        return message;
      }

      return {
        ...message,
        content: message.content.filter((part) => part.type !== "reasoning"),
      };
    });

    const result = streamText({
      model: groq(model),
      messages: groqMessages,
      system:
        "You are a cloud infrastructure assistant. Help users check service status and propose safe actions. Begin every response with 'LLM ACTIVE:'.",
      onError: ({ error }) => logChatError("Groq stream failed", error),
    });

    await result.pipeUIMessageStreamToResponse(res);
  } catch (error) {
    logChatError("Request failed", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: "The assistant could not complete this response. Check the API server logs.",
      });
    } else {
      res.end();
    }
  }
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
