import "dotenv/config";
import { DataSource } from "typeorm";
import { User, Token, Application, ApplicationDocument } from "./entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_CONNECTION_STRING!,
  migrationsRun: false, // ensure that migration are not run automatically on app start
  synchronize: false, // ensure that migration are not automatically run
  logging: false,
  entities: [User, Token, Application, ApplicationDocument],
  migrations: [__dirname + "/migration/**/*.ts"],
  subscribers: [],
});
