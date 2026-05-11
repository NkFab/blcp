"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const user_routes_1 = __importDefault(require("./users/user.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const application_routes_1 = __importDefault(require("./application/application.routes"));
exports.v1 = (0, express_1.Router)();
exports.v1.use("/auth", auth_routes_1.default);
exports.v1.use("/users", auth_middleware_1.authenticate, user_routes_1.default);
exports.v1.use("/applications", auth_middleware_1.authenticate, application_routes_1.default);
//# sourceMappingURL=routes.js.map