"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
(async () => {
    try {
        await database_1.AppDataSource.initialize();
        console.log("Database connection established successfully.");
    }
    catch (error) {
        console.log("Error during database connection initialization:", error);
    }
    const PORT = process.env.PORT || 3001;
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
})();
//# sourceMappingURL=index.js.map