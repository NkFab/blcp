import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import applicationController from "./application.controller";
import { authorize } from "../../../middlewares/auth.middleware";
import { UserRole } from "../../../database/entity";

const router: ExpressRouter = Router();

router.get("/", applicationController.handleGetAll);
router.get("/:id", applicationController.handleGetOne);
router.post(
  "/",
  authorize({ roles: [UserRole.APPLICANT] }),
  applicationController.prepareApplicationDetails,
  applicationController.handleCreate,
);

router.put(
  "/:id",
  authorize({ roles: [UserRole.APPLICANT, "self"], userIdKey: "applicantId" }),
  applicationController.prepareApplicationDetails,
  applicationController.handleUpdate,
);

router.put(
  "/:id/review",
  authorize({ roles: [UserRole.REVIEWER] }),
  applicationController.handleApplicationReview,
);

router.put(
  "/:id/approve",
  authorize({ roles: [UserRole.SUPERVISOR, UserRole.APPROVER] }),
  applicationController.handleApplicationApproval,
);

export default router;
