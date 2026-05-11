"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const express_helper_1 = __importDefault(require("../helpers/express.helper"));
const jwt_helpers_1 = require("../helpers/jwt.helpers");
const database_1 = require("../database");
const entity_1 = require("../database/entity");
const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header?.startsWith("Bearer ")) {
            throw new express_helper_1.default("Authorization header missing", 401);
        }
        const token = header.split(" ")[1];
        if (!token) {
            throw new express_helper_1.default("Token missing", 401);
        }
        const tokenPayload = (0, jwt_helpers_1.verifyAccessToken)(token);
        const user = await database_1.AppDataSource.getRepository(entity_1.User).findOneBy({
            id: tokenPayload.userId,
        });
        if (!user) {
            throw new express_helper_1.default("Invalid access token", 401);
        }
        req["user"] = user;
        next();
    }
    catch (error) {
        const err = error;
        return res.status(err.statusCode || 500).json({
            error: err.message || "Internal Server Error",
        });
    }
};
exports.authenticate = authenticate;
const recordBelongsToCurrentUser = (req, userIdKey) => {
    const userIds = [req.params[userIdKey], req.body[userIdKey]].filter(Boolean);
    return userIds.includes(req.user?.id);
};
const currentUserHasRole = (req, roles) => {
    return roles.includes(req.user?.role);
};
const authorize = ({ roles, userIdKey = "id", }) => {
    return (req, res, next) => {
        const hasSelfRole = roles.includes("self");
        const isSelf = hasSelfRole && recordBelongsToCurrentUser(req, userIdKey);
        const hasRole = currentUserHasRole(req, roles);
        if (isSelf || hasRole) {
            return next();
        }
        return res.status(403).json({ message: "Unauthorized" });
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map