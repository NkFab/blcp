"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const entity_1 = require("./entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_CONNECTION_STRING,
    migrationsRun: false, // ensure that migration are not run automatically on app start
    synchronize: false, // ensure that migration are not automatically run
    logging: false,
    entities: [entity_1.User, entity_1.Token, entity_1.Application, entity_1.ApplicationDocument],
    migrations: [__dirname + "/migration/**/*.ts"],
    subscribers: [],
});
//# sourceMappingURL=config.js.map