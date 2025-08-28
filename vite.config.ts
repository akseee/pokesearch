import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pokesearch/',
  server: {
    proxy: {
      '/mockServiceWorker.js': {
        target: 'http://localhost:5173',
        rewrite: () => '/pokesearch/mockServiceWorker.js',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      exclude: [
        'public',
        'node_modules/',
        'dist/',
        'src/main.{js,jsx,ts,tsx}',
        'src/setupTests.ts',
        'dist/',
        'src/vite-env.d.ts',
        'src/**/*.d.ts',
        '**/types.ts',
        '**/index.{ts,tsx}',
        '**/*.config.ts',
        '**/*.config.ts',
        'eslint.config.js',
        'src/app/',
        'src/shared/config',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
