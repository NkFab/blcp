import { FindManyOptions } from "typeorm";
import {
  Application,
  ApplicationStatus,
  UserRole,
} from "../../../database/entity";
import HttpError, { asyncRouterHandler } from "../../../helpers/express.helper";
import { MainController } from "../main.controller";
import {
  ApproveApplicationSchema,
  CreateApplicationSchema,
  ReviewApplicationSchema,
} from "./application.validator";
import { appEventEmitter } from "../../../events";
import type { Request } from "express";

type AuditAction = "create" | "update" | "review" | "approve";

class ApplicationController extends MainController<Application> {
  constructor() {
    super(Application, undefined, {
      beforeCreate: (data) =>
        this.emitAudit("create", data.id, data.applicantId, null, data),
      beforeUpdate: (before, after) =>
        this.emitAudit("update", after.id, after.applicantId, before, after),
    });
  }

  prepareApplicationDetails = asyncRouterHandler(async (req, _res, next) => {
    if (req.params.id && req.method === "PUT") {
      await CreateApplicationSchema.partial()
        .required({ version: true })
        .parseAsync(req.body);
      const application = await this.findById(req.params.id.toString());
      if (application?.status === ApplicationStatus.SUBMITTED) {
        throw new HttpError("Application has already been submitted", 409);
      }
    } else {
      await CreateApplicationSchema.parseAsync(req.body);
      req.body.applicantId = req.user.id;
    }

    if (req.body.status === ApplicationStatus.SUBMITTED) {
      req.body.submittedAt = new Date();
    }

    req.body.updatedAt = new Date();
    return next();
  });

  handleGetAll = asyncRouterHandler(async (req, res) => {
    const queryParams: FindManyOptions<Application> = {
      relations: {
        applicant: true,
        reviewer: true,
        documents: true,
        approver: true,
      },
    };

    if (req.user.role === UserRole.APPLICANT) {
      queryParams.where = { applicantId: req.user.id };
    }

    return res.json(await this.findAll(queryParams));
  });

  handleGetOne = asyncRouterHandler(async (req, res) => {
    const application = await this.findOne({
      where: { id: req.params.id!.toString() },
      relations: {
        applicant: true,
        reviewer: true,
        documents: true,
        approver: true,
        audits: true,
      },
    });

    if (!application) throw new HttpError("Application not found", 404);
    return res.json(application);
  });

  handleApplicationReview = asyncRouterHandler(async (req, res) => {
    await ReviewApplicationSchema.parseAsync(req.body);
    return res.json(
      await res.json(
        await this.handleReviewProcess(req, "review", {
          status: ApplicationStatus.REVIEWED,
          reviewedAt: new Date(),
          reviewerId: req.user.id,
        }),
      ),
    );
  });

  handleApplicationApproval = asyncRouterHandler(async (req, res) => {
    await ApproveApplicationSchema.parseAsync(req.body);
    return res.json(
      await this.handleReviewProcess(req, "approve", {
        approvedAt: new Date(),
        approverId: req.user.id,
      }),
    );
  });

  private async emitAudit(
    action: AuditAction,
    applicationId: string,
    userId: string,
    before: Partial<Application> | null,
    after: Application,
  ): Promise<void> {
    await appEventEmitter.emit("application:audit", {
      action,
      applicationId,
      userId,
      snapshot: { before, after },
    });
  }

  private async handleReviewProcess(
    req: Request,
    action: "review" | "approve",
    payload: Partial<Application>,
  ) {
    // using transaction here prevent race conditions, where two reviewers could submit
    // a review decision at the same time
    const result = await this.dataSource.transaction(async (manager) => {
      const application = await manager.findOne(Application, {
        where: { id: req.params.id!.toString() },
        lock: { mode: "pessimistic_write" }, // held until transaction closes
      });

      if (!application) throw new HttpError("Application not found", 404);

      // versioning ensure that we are not submitting stale data.
      if (application.version !== req.body.version) {
        throw new HttpError(
          "Application has been modified by another process. Please refresh and try again.",
          409,
        );
      }
      this.assertStatus(application, action);

      const before = { ...application };
      Object.assign(application, {
        ...req.body,
        ...payload,
        updatedAt: new Date(),
      });

      await manager.save(application);
      await this.emitAudit(
        action,
        application.id,
        req.user.id,
        before,
        application,
      );
      return application;
    });

    return result;
  }

  assertStatus(application: Application, action: "review" | "approve") {
    if (
      action === "review" &&
      application.status !== ApplicationStatus.SUBMITTED
    ) {
      throw new HttpError("Only submitted applications can be reviewed", 400);
    }

    if (
      action === "approve" &&
      application.status !== ApplicationStatus.REVIEWED
    ) {
      throw new HttpError(
        "Only reviewed applications can be approved or rejected",
        400,
      );
    }
  }
}

export default new ApplicationController();
