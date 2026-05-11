import type { Request, Response, NextFunction } from "express";
import { UserRole } from "../database/entity/User";
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorize: ({ roles, userIdKey, }: {
    roles: (UserRole | "self")[];
    userIdKey?: string;
}) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map