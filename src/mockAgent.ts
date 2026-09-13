// src/mockAgent.ts

// Each response type maps to a specific UI component
export type AgentResponse =
  | { type: "status_card"; data: { service: string; status: "healthy" | "degraded" | "down"; uptime: string } }
  | { type: "confirmation"; data: { message: string; confirmLabel: string } }
  | { type: "text"; data: { content: string } };

// This simulates an AI agent returning structured data instead of plain text
export function askAgent(question: string): AgentResponse {
  const q = question.toLowerCase();

  if (q.includes("status") || q.includes("health")) {
    return {
      type: "status_card",
      data: {
        service: "api-gateway",
        status: "healthy",
        uptime: "99.98%",
      },
    };
  }

  if (q.includes("restart") || q.includes("reboot")) {
    return {
      type: "confirmation",
      data: {
        message: "Are you sure you want to restart api-gateway?",
        confirmLabel: "Restart Service",
      },
    };
  }

  return {
    type: "text",
    data: { content: "I'm not sure how to help with that. Try asking about service status or restarting a service." },
  };
}