import { MessagePrimitive } from "@assistant-ui/react";
import { AgentRenderer } from "../AgentRenderer";
import type { AgentResponse } from "../mockAgent";

export function AgentMessage() {
  return (
    <MessagePrimitive.Root className="flex w-full justify-start">
      <div className="max-w-md">
        <MessagePrimitive.Content
          components={{
            Text: (part) => {
              // Try to decode structured JSON from the agent
              try {
                const parsed = JSON.parse(part.text) as AgentResponse;
                if (parsed && typeof parsed === "object" && "type" in parsed) {
                  return <AgentRenderer response={parsed} />;
                }
              } catch {
                // Not JSON — render as plain text
              }
              return <p className="text-sm">{part.text}</p>;
            },
          }}
        />
      </div>
    </MessagePrimitive.Root>
  );
}