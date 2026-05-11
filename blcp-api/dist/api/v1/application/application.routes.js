"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = __importDefault(require("./application.controller"));
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const entity_1 = require("../../../database/entity");
const router = (0, express_1.Router)();
router.get("/", application_controller_1.default.handleGetAll);
router.get("/:id", application_controller_1.default.handleGetOne);
router.post("/", (0, auth_middleware_1.authorize)({ roles: [entity_1.UserRole.APPLICANT] }), application_controller_1.default.prepareApplicationDetails, application_controller_1.default.handleCreate);
router.put("/:id", (0, auth_middleware_1.authorize)({ roles: [entity_1.UserRole.APPLICANT, "self"], userIdKey: "applicantId" }), application_controller_1.default.prepareApplicationDetails, application_controller_1.default.handleUpdate);
exports.default = router;
//# sourceMappingURL=application.routes.js.map