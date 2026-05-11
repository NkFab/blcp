"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncRouterHandler = exports.HttpError = void 0;
const typeorm_1 = require("typeorm");
const zod_1 = require("zod");
class HttpError extends Error {
    statusCode;
    type;
    code;
    constructor(messageOrOptions, statusCode) {
        if (typeof messageOrOptions === "string") {
            super(messageOrOptions);
            this.statusCode = statusCode;
            this.name = "HttpError";
        }
        else {
            super(messageOrOptions.message);
            this.statusCode = messageOrOptions.statusCode;
            this.type = messageOrOptions.type;
            this.code = messageOrOptions.code;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpError = HttpError;
exports.default = HttpError;
const asyncRouterHandler = (fn) => {
    return async (req, res, next) => {
        try {
            return await fn(req, res, next);
        }
        catch (error) {
            console.log("Error in asyncRouterHandler:", error);
            // handle validation errors by formatting zod errors
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: "Validation Error",
                    errors: (0, zod_1.flattenError)(error),
                });
            }
            // handle unique constraint violations (e.g. email already exists or duplicate reference number)
            if (error instanceof typeorm_1.QueryFailedError &&
                error.code === "23505") {
                return res.status(409).json({
                    message: "Conflict Error: Duplicate entry",
                    details: error.detail,
                });
            }
            // for any other thrown error
            const err = error;
            return res.status(err.statusCode || 500).json({
                message: err.message || "Internal Server Error",
                type: err.type,
                code: err.code,
            });
        }
    };
};
exports.asyncRouterHandler = asyncRouterHandler;
//# sourceMappingURL=express.helper.js.map