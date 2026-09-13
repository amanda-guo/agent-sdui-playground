import {
  useLocalRuntime,
  type ChatModelAdapter,
} from "@assistant-ui/react";
import { askAgent } from "./mockAgent";

// This adapter tells assistant-ui how to "run" our agent.
// In a real system, this would call an LLM API with tool definitions.
const mockAdapter: ChatModelAdapter = {
  async *run({ messages }) {
    const lastMessage = messages[messages.length - 1];
    const userText =
      lastMessage.content
        .filter((c) => c.type === "text")
        .map((c) => (c as { type: "text"; text: string }).text)
        .join(" ") ?? "";

    // Simulate a delay so it feels like a real agent
    await new Promise((r) => setTimeout(r, 600));

    const response = askAgent(userText);

    // assistant-ui expects streaming content. We yield a single chunk.
    yield {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(response), // We'll decode this in the renderer
        },
      ],
    };
  },
};

export function useMockAgentRuntime() {
  return useLocalRuntime(mockAdapter);
}