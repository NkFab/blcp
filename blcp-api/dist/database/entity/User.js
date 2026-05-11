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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Token_1 = require("./Token");
const Application_1 = require("./Application");
var UserRole;
(function (UserRole) {
    UserRole["APPLICANT"] = "applicant";
    UserRole["REVIEWER"] = "reviewer";
    UserRole["APPROVER"] = "approver";
    UserRole["SUPERVISOR"] = "supervisor";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    id;
    firstName;
    lastName;
    email;
    role;
    password;
    isActive;
    tokens;
    assignedApplications;
    applications;
    createdAt;
    updatedAt;
    /************************************/
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt_1.default.hash(this.password, 10);
        }
    }
    async comparePassword(plainPassword) {
        return await bcrypt_1.default.compare(plainPassword, this.password);
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.APPLICANT,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Token_1.Token, (token) => token.user),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Application_1.Application, (application) => application.reviewedBy),
    __metadata("design:type", Array)
], User.prototype, "assignedApplications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Application_1.Application, (application) => application.applicant),
    __metadata("design:type", Array)
], User.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
//# sourceMappingURL=User.js.map