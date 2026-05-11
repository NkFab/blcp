import "dotenv/config";
import { AppDataSource } from "../config";
import fs from "node:fs";

async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully.");

    const files = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith(".seeders.ts"));

    await AppDataSource.transaction(async (transactionalEntityManager) => {
      for (const file of files) {
        const seederModule = require(`./${file}`);
        if (seederModule && typeof seederModule.default === "function") {
          await seederModule.default(transactionalEntityManager);
          console.log(`[x] ${file} executed successfully.`);
        } else {
          console.warn(
            `Seeder file ${file} does not export a default function.`,
          );
        }
      }
    });

    console.log("Seeders executed successfully.");
  } catch (error) {
    console.error("Error running seeders:", error);
  } finally {
    await AppDataSource.destroy();
    console.log("Database connection closed.");
  }
}

runSeeders();
