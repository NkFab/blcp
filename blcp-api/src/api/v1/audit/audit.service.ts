import { Audit } from "../../../database/entity";
import { MainModel } from "../../../database/main.model";

class AuditService extends MainModel<Audit> {
  constructor(repository: typeof Audit) {
    super(repository);
  }
}

export default new AuditService(Audit);
