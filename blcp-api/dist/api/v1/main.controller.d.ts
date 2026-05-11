import { EntityTarget, ObjectLiteral } from "typeorm";
import { MainModel } from "../../database/main.model";
import { ZodObject, ZodRawShape } from "zod";
export declare class MainController<T extends ObjectLiteral> extends MainModel<T> {
    schema: ZodObject<ZodRawShape> | undefined;
    constructor(repository: EntityTarget<T>, schema?: ZodObject<ZodRawShape>);
    handleGetOne: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    handleGetAll: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    handleCreate: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    handleUpdate: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
}
//# sourceMappingURL=main.controller.d.ts.map