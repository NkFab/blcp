import type { NextFunction, Request, Response } from "express";
interface HttpErrorType {
    code: number;
    type: string;
    message: string;
    statusCode: number;
}
export declare class HttpError extends Error {
    readonly statusCode: number;
    readonly type: string;
    readonly code: number;
    constructor(options: HttpErrorType);
    constructor(message: string, httpStatus: number);
}
export default HttpError;
export declare const asyncRouterHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=express.helper.d.ts.map