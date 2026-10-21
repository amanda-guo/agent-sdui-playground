import { useLocalRuntime } from "@assistant-ui/react";
import type { ChatModelAdapter } from "@assistant-ui/react";
import { askAgent } from "./mockAgent";

const chatModel: ChatModelAdapter = {
  async run({ messages }) {
    const question = messages
      .filter((message) => message.role === "user")
      .at(-1)
      ?.content.filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(askAgent(question ?? "")),
        },
      ],
    };
  },
};

export function useAgentRuntime() {
  return useLocalRuntime(chatModel);
}