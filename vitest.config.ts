import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["tests/setup.ts"],
    coverage: {
      provider: "v8",
      exclude: ["src/app/errors", "src/app/middlewares/g*"],
    },
  },
});
