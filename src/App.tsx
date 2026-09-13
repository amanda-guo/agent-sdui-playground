import { AssistantRuntimeProvider, Thread } from "@assistant-ui/react";
import { useMockAgentRuntime } from "./agentRuntime";
import { AgentMessage } from "./components/AgentMessage";

export default function App() {
  const runtime = useMockAgentRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="min-h-screen bg-background flex flex-col items-center p-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-6">
            Agent UI Playground
          </h1>

          <div className="h-[600px] border rounded-lg overflow-hidden">
            <Thread
              components={{
                Message: AgentMessage,
              }}
            />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}