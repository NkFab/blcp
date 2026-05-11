import { Router } from "express";
import authController from "./auth.controller";
import { authenticate } from "../../../middlewares/auth.middleware";

const auth = Router();

auth.post("/login", authController.login);
auth.post("/refresh", authController.refreshToken);
auth.post("/logout", authenticate, authController.logout);
auth.get("/current-user", authenticate, authController.getCurrentUser);

export default auth;
