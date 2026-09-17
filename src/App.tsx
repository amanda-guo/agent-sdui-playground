import { useEffect, useState } from "react";
import { Moon, SunMedium } from "lucide-react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/elements/thread.aui";
import { useMockAgentRuntime } from "./agentRuntime";
import { AgentMessage } from "./components/AgentMessage";

export default function App() {
  const runtime = useMockAgentRuntime();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem("agent-sdui-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem("agent-sdui-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div
        className={[
          "min-h-screen transition-colors duration-200",
          isDark ? "bg-slate-950 text-slate-50" : "bg-[#f3f4f6] text-[#111111]",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-slate-50">
              Agent SDUI Playground
            </h1>

            <button
              type="button"
              onClick={() => setIsDark((current) => !current)}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={[
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                isDark
                  ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  : "border-slate-300 bg-white text-[#111111] hover:bg-slate-50",
              ].join(" ")}
            >
              {isDark ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <div
            className={[
              "h-[620px] overflow-hidden rounded-2xl border shadow-sm",
              isDark
                ? "border-slate-700 bg-slate-900/80 shadow-slate-950/30"
                : "border-slate-300 bg-white shadow-slate-300/60",
            ].join(" ")}
          >
            <Thread
              components={{
                AssistantMessage: AgentMessage,
              }}
            />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}