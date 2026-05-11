import { Token } from "../../../database/entity/Token";
import { User } from "../../../database/entity/User";
import { MainModel } from "../../../database/main.model";
declare class AuthController extends MainModel<User> {
    tokenRepo: import("typeorm").Repository<Token>;
    constructor();
    login: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    refreshToken: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    logout: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    getCurrentUser: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    private generateAndSaveTokens;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=auth.controller.d.ts.map