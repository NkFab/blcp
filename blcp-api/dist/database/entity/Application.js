"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.LicenceType = exports.InstitutionType = exports.ApplicationStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const ApplicationDocument_1 = require("./ApplicationDocument");
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["DRAFT"] = "draft";
    ApplicationStatus["SUBMITTED"] = "submitted";
    ApplicationStatus["UNDER_REVIEW"] = "under_review";
    ApplicationStatus["APPROVED"] = "approved";
    ApplicationStatus["REJECTED"] = "rejected";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var InstitutionType;
(function (InstitutionType) {
    InstitutionType["COMMERCIAL"] = "commercial_bank";
    InstitutionType["DEVELOPMENT"] = "development_bank";
    InstitutionType["COOPERATIVE"] = "cooperative_bank";
    InstitutionType["MORTGAGE"] = "mortgage_bank";
})(InstitutionType || (exports.InstitutionType = InstitutionType = {}));
var LicenceType;
(function (LicenceType) {
    LicenceType["COMMERCIAL"] = "commercial_licence";
    LicenceType["DEVELOPMENT"] = "development_bank_licence";
    LicenceType["MICROFINANCE"] = "microfinance_bank_licence";
})(LicenceType || (exports.LicenceType = LicenceType = {}));
let Application = class Application {
    id;
    referenceNumber;
    institutionName;
    institutionType;
    capitalAmount;
    licenceType;
    status;
    isForeignApplicant;
    isExistingInstitution;
    /**********TIMESTAMPS and association**************/
    applicantId;
    applicant;
    reviewedById;
    reviewedBy;
    documents;
    createdAt;
    updatedAt;
    submittedAt;
    reviewedAt;
    reviewCompletedAt;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Application.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "institutionName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: InstitutionType,
    }),
    __metadata("design:type", String)
], Application.prototype, "institutionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], Application.prototype, "capitalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: LicenceType,
    }),
    __metadata("design:type", String)
], Application.prototype, "licenceType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ApplicationStatus,
        default: ApplicationStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Application.prototype, "isForeignApplicant", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Application.prototype, "isExistingInstitution", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], Application.prototype, "applicantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.applications, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "applicantId" }),
    __metadata("design:type", User_1.User)
], Application.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "reviewedById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.assignedApplications, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "reviewedById" }),
    __metadata("design:type", Object)
], Application.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ApplicationDocument_1.ApplicationDocument, (document) => document.application, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Application.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Application.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Application.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Application.prototype, "reviewCompletedAt", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)("applications")
], Application);
//# sourceMappingURL=Application.js.map