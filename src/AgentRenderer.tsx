import type { AgentResponse } from "./mockAgent";
import { StatusCard } from "./components/StatusCard";
import { ConfirmationCard } from "./components/ConfirmationCard";
import { TextCard } from "./components/TextCard";

// This registry maps response types to components
const registry = {
  status_card: StatusCard,
  confirmation: ConfirmationCard,
  text: TextCard,
} as const;

interface AgentRendererProps {
  response: AgentResponse;
}

export function AgentRenderer({ response }: AgentRendererProps) {
  const Component = registry[response.type];

  if (!Component) {
    return <p className="text-red-500">Unknown response type: {response.type}</p>;
  }

  return <Component data={response.data as any} />;
}