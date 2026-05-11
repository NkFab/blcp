// jest.setup.ts
import "reflect-metadata";
import * as dotenv from "dotenv";

// Load environment variables for testing (optional but recommended)
dotenv.config({ path: ".env.test" });
