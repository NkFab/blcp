"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const auth = (0, express_1.Router)();
auth.post("/login", auth_controller_1.default.login);
auth.post("/refresh", auth_controller_1.default.refreshToken);
auth.post("/logout", auth_middleware_1.authenticate, auth_controller_1.default.logout);
auth.get("/current-user", auth_middleware_1.authenticate, auth_controller_1.default.getCurrentUser);
exports.default = auth;
//# sourceMappingURL=auth.routes.js.map