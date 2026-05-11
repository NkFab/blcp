"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const User_1 = require("../../../database/entity/User");
const users = (0, express_1.Router)();
users.get("/", (0, auth_middleware_1.authorize)({ roles: [User_1.UserRole.SUPERVISOR] }), user_controller_1.default.handleGetAll);
users.get("/:id", (0, auth_middleware_1.authorize)({ roles: ["self", User_1.UserRole.SUPERVISOR] }), user_controller_1.default.handleGetOne);
exports.default = users;
//# sourceMappingURL=user.routes.js.map