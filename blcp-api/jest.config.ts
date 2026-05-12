import type { Config } from "jest";
import { createDefaultEsmPreset } from "ts-jest";

const presetConfig = createDefaultEsmPreset({});

export default {
  ...presetConfig,
  testEnvironment: "node",
  testMatch: [
    "**/tests/**/*.test.ts",
    "**/__tests__/**/*.test.ts",
    "**/?(*.)+(spec|test).ts",
  ],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testTimeout: 30000,
  globalSetup: "<rootDir>/tests/jest.global-setup.ts",
  globalTeardown: "<rootDir>/tests/jest.global-teardown.ts",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup-after-env.ts"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/database/config.ts",
    "!src/database/seeders/**",
    "!src/database/migration/**",
    "!src/api/v1/application/__tests__/**",
  ],
} satisfies Config;
