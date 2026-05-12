import "reflect-metadata";
import request from "supertest";
import app from "../app";
import { AppDataSource } from "../database/config";
export const server = request(app);
import fs from "node:fs";

export const connectToTestDB = async () => {
  await AppDataSource.initialize();
};

export const disconnectFromTestDB = async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  }
};

export const getAuthToken = (role: string) => {
  const tokensFile = ".test-tokens.json";
  if (!fs.existsSync(tokensFile)) {
    throw new Error(
      "Test tokens file not found. Make sure to run the global setup.",
    );
  }
  const tokensData = fs.readFileSync(tokensFile, "utf-8");
  const tokens = JSON.parse(tokensData);
  return tokens[role];
};
