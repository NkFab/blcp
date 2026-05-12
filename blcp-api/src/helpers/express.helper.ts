import type { NextFunction, Request, Response } from "express";
import { OptimisticLockVersionMismatchError, QueryFailedError } from "typeorm";
import { ZodError, flattenError } from "zod";

interface HttpErrorType {
  code: number;
  type: string;
  message: string;
  statusCode: number;
}

export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly type: string;
  public readonly code: number;

  constructor(options: HttpErrorType);
  constructor(message: string, httpStatus: number);

  constructor(messageOrOptions: string | HttpErrorType, statusCode?: number) {
    if (typeof messageOrOptions === "string") {
      super(messageOrOptions);
      this.statusCode = statusCode!;
      this.name = "HttpError";
    } else {
      super(messageOrOptions.message);
      this.statusCode = messageOrOptions.statusCode;
      this.type = messageOrOptions.type;
      this.code = messageOrOptions.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;

export const asyncRouterHandler = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      // handle validation errors by formatting zod errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation Error",
          errors: flattenError(error),
        });
      }

      // handle unique constraint violations (e.g. email already exists or duplicate reference number)
      if (
        error instanceof QueryFailedError &&
        (error as unknown as Record<string, unknown>).code === "23505"
      ) {
        return res.status(409).json({
          message: "Conflict Error: Duplicate entry",
          details: (error as unknown as Record<string, unknown>).detail,
        });
      }

      // handle concurrent update conflicts
      if (error instanceof OptimisticLockVersionMismatchError) {
        return res.status(409).json({
          message:
            "Conflict Error: Record has been modified by another process. Please refresh and try again.",
        });
      }

      // for any other thrown error
      const err = error as HttpError;
      return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
        type: err.type,
        code: err.code,
      });
    }
  };
};
