# Agent SDUI Playground

This project is a lightweight React + Vite playground for experimenting with agent-style chat UIs built with Assistant UI. It provides a Groq-backed chat runtime and a clean chat thread interface so you can prototype AI assistant experiences, message rendering, and tool interactions.

## Features

- Agent chat thread layout
- Groq-backed assistant chat
- Light/dark mode toggle
- Assistant UI components for message rendering and tool fallbacks
- Shadcn-inspired styling and reusable UI primitives

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Groq API key to `.env`:
   ```env
   GROQ_API_KEY=your-groq-api-key
   ```
   Optionally set `GROQ_MODEL` to choose a different Groq model. The default is `openai/gpt-oss-120b`.
3. Start both the frontend and API server:
   ```bash
   npm run dev:full
   ```
4. Open the local URL shown in the terminal (typically http://localhost:5173)

## Build for production

```bash
npm run build
```

## Notes

This app is intended as a UI playground and prototyping environment, not a production AI backend. The Groq runtime is meant to help you iterate on layout, interactions, and component behavior quickly.
