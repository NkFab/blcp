import "dotenv/config";
import { DataSource } from "typeorm";
import { User, Token, Application, ApplicationDocument, Audit } from "./entity";

const isTestEnv = process.env.NODE_ENV === "test";

const DATABASE_CONNECTION_STRING = isTestEnv
  ? process.env.TEST_DATABASE_CONNECTION_STRING
  : process.env.DATABASE_CONNECTION_STRING;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_CONNECTION_STRING!,
  migrationsRun: isTestEnv, // ensure that migration are not run automatically on app start
  synchronize: isTestEnv, // ensure that migration are not automatically run
  logging: false,
  entities: [User, Token, Application, ApplicationDocument, Audit],
  migrations: [__dirname + "/migration/**/*.ts"],
  subscribers: [],
});
