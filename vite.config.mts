import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Ai-second-/',
  plugins: [react()],
  server: { port: 5173 },
  build: { target: 'es2022' }
});
