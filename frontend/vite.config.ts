import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const BACKEND = 'http://localhost:8080';

export default defineConfig({
  plugins: [react()],
  server: {
    // PORT env var overrides the default dev server port
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    proxy: {
      '/api': BACKEND,
      '/actuator': BACKEND,
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    pool: 'threads',
    testTimeout: 15000,
  }
});
