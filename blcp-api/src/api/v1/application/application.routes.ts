import { Router } from "express";
import applicationController from "./application.controller";
import { authorize } from "../../../middlewares/auth.middleware";
import { UserRole } from "../../../database/entity";

const router = Router();

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

export default router;
