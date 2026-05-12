import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
import fs from "node:fs";
import path from "node:path";

// import { AppDataSource } from "../src/database/config";
import data from "../src/database/seeders/data";
import { server, connectToTestDB } from "../src/__tests__/common";

export default async function () {
  //   // this runs in its own Node process, so we open, migrate, close
  //   await AppDataSource.initialize();
  //   await AppDataSource.runMigrations();
  //   // optional seed here
  //   await AppDataSource.destroy();
  //   console.log("✓ test DB migrated");

  const tokens: Record<string, string> = {};

  await connectToTestDB();
  for (const u of data.users) {
    const login = await server.post("/api/v1/auth/login").send({
      email: u.email,
      password: process.env.USER_PASSWORD || "password123",
    });

    tokens[u.role] = login.body.accessToken as string;
  }
  const outFile = path.join(process.cwd(), ".test-tokens.json");
  fs.writeFileSync(outFile, JSON.stringify(tokens));
}
