import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";

const transport = new AssistantChatTransport({ api: "/api/chat" });

export function useAgentRuntime() {
  return useChatRuntime({ transport });
}