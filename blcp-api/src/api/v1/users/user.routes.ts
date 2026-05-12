import { Router } from "express";
import userController from "./user.controller";
import { authorize } from "../../../middlewares/auth.middleware";
import { UserRole } from "../../../database/entity/User";

const users = Router();

users.get(
  "/",
  authorize({ roles: [UserRole.SUPERVISOR] }),
  userController.handleGetAll,
);
users.get(
  "/:id",
  authorize({ roles: ["self", UserRole.SUPERVISOR] }),
  userController.handleGetOne,
);

export default users;
