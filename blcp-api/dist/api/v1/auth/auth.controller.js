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
const Token_1 = require("../../../database/entity/Token");
const User_1 = require("../../../database/entity/User");
const main_model_1 = require("../../../database/main.model");
const express_helper_1 = __importStar(require("../../../helpers/express.helper"));
const jwt_helpers_1 = require("../../../helpers/jwt.helpers");
const auth_validator_1 = require("./auth.validator");
class AuthController extends main_model_1.MainModel {
    tokenRepo = this.dataSource.getRepository(Token_1.Token);
    constructor() {
        super(User_1.User);
    }
    login = (0, express_helper_1.asyncRouterHandler)(async (req, res) => {
        const payload = auth_validator_1.LoginSchema.parse(req.body);
        const user = await this.dataSource
            .getRepository(this.repository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email: payload.email })
            .getOne();
        if (!user) {
            throw new express_helper_1.default("Invalid credentials", 401);
        }
        const isValidPassword = await user.comparePassword(payload.password);
        if (!isValidPassword) {
            throw new express_helper_1.default("Invalid credentials", 401);
        }
        const tokens = await this.generateAndSaveTokens(user);
        return res.json(tokens);
    });
    refreshToken = (0, express_helper_1.asyncRouterHandler)(async (req, res) => {
        const payload = auth_validator_1.RefreshTokenSchema.parse(req.body);
        const existingToken = await this.tokenRepo.findOneBy({
            token: payload.refreshToken,
        });
        if (!existingToken || existingToken.expiresAt < new Date()) {
            throw new express_helper_1.default("Invalid refresh token", 401);
        }
        const refreshTokenPayload = (0, jwt_helpers_1.verifyRefreshToken)(payload.refreshToken);
        const user = await this.findById(refreshTokenPayload.userId);
        if (!user) {
            throw new express_helper_1.default("Invalid refresh token", 401);
        }
        await this.tokenRepo.delete({ id: existingToken.id });
        const tokens = await this.generateAndSaveTokens(user);
        return res.json(tokens);
    });
    logout = (0, express_helper_1.asyncRouterHandler)(async (req, res) => {
        const { id } = req.user;
        await this.tokenRepo.delete({ userId: id });
        return res.json({ message: "Logged out successfully" });
    });
    getCurrentUser = (0, express_helper_1.asyncRouterHandler)(async (req, res) => {
        return res.json(req.user);
    });
    async generateAndSaveTokens(user) {
        const tokens = (0, jwt_helpers_1.generateTokens)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        // save new refresh token
        await this.tokenRepo.save(this.tokenRepo.create({
            token: tokens.refreshToken,
            userId: user.id,
            expiresAt: new Date(new Date().getTime() + tokens.expiresIn),
        }));
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map