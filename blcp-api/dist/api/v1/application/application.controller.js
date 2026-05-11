"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../../../database/entity");
const express_helper_1 = __importStar(require("../../../helpers/express.helper"));
const main_controller_1 = require("../main.controller");
const application_validator_1 = require("./application.validator");
class ApplicationController extends main_controller_1.MainController {
    constructor() {
        super(entity_1.Application, application_validator_1.CreateApplicationSchema);
    }
    prepareApplicationDetails = (0, express_helper_1.asyncRouterHandler)(async (req, _res, next) => {
        if (req.params.id) {
            const application = await this.findById(req.params.id.toString());
            if (application?.status === entity_1.ApplicationStatus.SUBMITTED) {
                throw new express_helper_1.default("Application has already been submitted", 409);
            }
        }
        if (req.body.status === entity_1.ApplicationStatus.SUBMITTED) {
            req.body.submittedAt = new Date();
        }
        req.body.applicantId = req.user.id;
        return next();
    });
    handleGetAll = (0, express_helper_1.asyncRouterHandler)(async (req, res) => {
        const queryParams = {
            relations: { applicant: true, reviewedBy: true, documents: true },
        };
        // ensure applicants can only see their own applications
        if (req.user.role === entity_1.UserRole.APPLICANT) {
            queryParams["where"] = { applicantId: req.user.id };
        }
        const results = await this.findAll(queryParams);
        return res.json(results);
    });
}
exports.default = new ApplicationController();
//# sourceMappingURL=application.controller.js.map