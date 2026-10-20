import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repository as a project site under /Ai-second-/.
// Keeping the base explicit prevents the production bundle from requesting
// /assets/* and /src/* from the domain root, which can produce a blank page.
export default defineConfig({
  base: '/Ai-second-/',
  plugins: [react()],
  server: { port: 5173 },
  build: { target: 'es2022' }
});
