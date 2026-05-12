import auditService from "../api/v1/audit/audit.service";
import { appEventEmitter } from "./event.config";
export { appEventEmitter };

appEventEmitter.on("application:audit", async (auditData) => {
  try {
    await auditService.create(auditData);
  } catch (error) {
    console.error("Error handling audit event:", error);
  }
});
