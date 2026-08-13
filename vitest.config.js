import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: ['node_modules', '**/*.config.js', '**/*.cjs', '**/__tests__/**'],
    },
    globals: true,
  },
});
