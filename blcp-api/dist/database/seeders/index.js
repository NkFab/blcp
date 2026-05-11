"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("../config");
const node_fs_1 = __importDefault(require("node:fs"));
async function runSeeders() {
    try {
        await config_1.AppDataSource.initialize();
        console.log("Database connection established successfully.");
        const files = node_fs_1.default
            .readdirSync(__dirname)
            .filter((file) => file.endsWith(".seeders.ts"));
        for (const file of files) {
            const seederModule = require(`./${file}`);
            if (seederModule && typeof seederModule.default === "function") {
                console.log(`Running seeder: ${file}`);
                await seederModule.default(config_1.AppDataSource);
            }
            else {
                console.warn(`Seeder file ${file} does not export a default function.`);
            }
        }
        console.log("Seeders executed successfully.");
    }
    catch (error) {
        console.error("Error running seeders:", error);
    }
    finally {
        await config_1.AppDataSource.destroy();
        console.log("Database connection closed.");
    }
}
runSeeders();
//# sourceMappingURL=index.js.map