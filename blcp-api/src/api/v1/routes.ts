import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

import users from "./users/user.routes";
import auth from "./auth/auth.routes";
import applications from "./application/application.routes";

export const v1 = Router();

v1.use("/auth", auth);
v1.use("/users", authenticate, users);
v1.use("/applications", authenticate, applications);
