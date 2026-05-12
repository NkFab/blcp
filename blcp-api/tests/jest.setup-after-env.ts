// jest.setup-after-env.ts
import "reflect-metadata";
import { AppDataSource } from "../src/database/config";
import { beforeAll, afterAll } from "@jest/globals";

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
}, 30000);

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
