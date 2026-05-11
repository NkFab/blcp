import { Application } from "../../../database/entity";
import { MainController } from "../main.controller";
declare class ApplicationController extends MainController<Application> {
    constructor();
    prepareApplicationDetails: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
    handleGetAll: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void | import("express").Response<any, Record<string, any>>>;
}
declare const _default: ApplicationController;
export default _default;
//# sourceMappingURL=application.controller.d.ts.map