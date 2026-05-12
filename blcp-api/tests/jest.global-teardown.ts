import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import fs from "node:fs";
import { disconnectFromTestDB } from "../src/__tests__/common";

export default async function () {
  await disconnectFromTestDB();
  if (fs.existsSync(".test-tokens.json")) fs.unlinkSync(".test-tokens.json");

  console.log("✓ test DB dropped");
}
