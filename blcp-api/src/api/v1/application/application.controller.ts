import { FindManyOptions } from "typeorm";
import {
  Application,
  ApplicationStatus,
  UserRole,
} from "../../../database/entity";
import HttpError, { asyncRouterHandler } from "../../../helpers/express.helper";
import { MainController } from "../main.controller";
import { CreateApplicationSchema } from "./application.validator";

class ApplicationController extends MainController<Application> {
  constructor() {
    super(Application, CreateApplicationSchema);
  }

  prepareApplicationDetails = asyncRouterHandler(async (req, _res, next) => {
    if (req.params.id) {
      const application = await this.findById(req.params.id.toString());
      if (application?.status === ApplicationStatus.SUBMITTED) {
        throw new HttpError("Application has already been submitted", 409);
      }
    }

    if (req.body.status === ApplicationStatus.SUBMITTED) {
      req.body.submittedAt = new Date();
    }
    req.body.applicantId = req.user.id;
    
    return next();
  });

  handleGetAll = asyncRouterHandler(async (req, res) => {
    const queryParams: FindManyOptions<Application> = {
      relations: { applicant: true, reviewedBy: true, documents: true },
    };

    // ensure applicants can only see their own applications
    if (req.user.role === UserRole.APPLICANT) {
      queryParams["where"] = { applicantId: req.user.id };
    }

    const results = await this.findAll(queryParams);
    return res.json(results);
  });
}

export default new ApplicationController();
