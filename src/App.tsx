import { useState } from "react";
import { askAgent, type AgentResponse } from "./mockAgent";
import { AgentRenderer } from "./AgentRenderer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<AgentResponse | null>(null);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setResponse(askAgent(input));
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Agent UI Playground</h1>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Try 'status' or 'restart'..."
          />
          <Button onClick={handleSubmit}>Ask</Button>
        </div>

        {response && <AgentRenderer response={response} />}
      </div>
    </div>
  );
}