"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateApplicationSchema = exports.CreateApplicationDocumentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const entity_1 = require("../../../database/entity");
const Application_1 = require("../../../database/entity/Application");
exports.CreateApplicationDocumentSchema = zod_1.default.object({
    fileType: zod_1.default.string(),
    url: zod_1.default.string(),
    originalFileName: zod_1.default.string(),
    mimeType: zod_1.default.string(),
    fileSize: zod_1.default.number().int(),
});
exports.CreateApplicationSchema = zod_1.default.object({
    referenceNumber: zod_1.default.string(),
    institutionName: zod_1.default.string(),
    institutionType: zod_1.default.enum(Application_1.InstitutionType),
    capitalAmount: zod_1.default.number().min(0),
    licenceType: zod_1.default.enum(Application_1.LicenceType),
    status: zod_1.default
        .enum([entity_1.ApplicationStatus.SUBMITTED, entity_1.ApplicationStatus.DRAFT])
        .default(entity_1.ApplicationStatus.DRAFT),
    isForeignApplicant: zod_1.default.boolean().default(false),
    isExistingInstitution: zod_1.default.boolean().default(false),
    documents: zod_1.default.array(exports.CreateApplicationDocumentSchema).optional(),
    submittedAt: zod_1.default.date().optional(),
    applicantId: zod_1.default.string().optional(),
});
//# sourceMappingURL=application.validator.js.map