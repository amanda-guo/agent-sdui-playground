import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {                       
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules\/(?:react|react-dom|scheduler)(?:\/|$)/,
            },
            {
              name: 'assistant-runtime-vendor',
              test: /node_modules\/@assistant-ui\/react\/dist\/legacy-runtime(?:\/|$)/,
            },
            {
              name: 'assistant-primitives-vendor',
              test: /node_modules\/@assistant-ui\/react\/dist\/primitives(?:\/|$)/,
            },
            {
              name: 'assistant-context-vendor',
              test: /node_modules\/@assistant-ui\/react\/dist\/context(?:\/|$)/,
            },
            {
              name: 'assistant-vendor',
              test: /node_modules\/@assistant-ui(?:\/|$)/,
            },
            {
              name: 'markdown-vendor',
              test: /node_modules\/(?:remark-gfm|unified|remark-parse|micromark)(?:\/|$)/,
            },
            {
              name: 'icon-vendor',
              test: /node_modules\/lucide-react(?:\/|$)/,
            },
            {
              name: 'vendor',
              test: /node_modules\//,
            },
          ],
        },
      },
    },
  },
})