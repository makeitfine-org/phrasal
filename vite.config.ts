import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/phrasal/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    pool: 'threads',
    isolate: false,
    poolOptions: {
      threads: {
        minThreads: 2,
      },
    },
  },
});
