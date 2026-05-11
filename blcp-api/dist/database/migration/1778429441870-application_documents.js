"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationDocuments1778429441870 = void 0;
const APPLICANT_ID_FOREIGN_KEY_CONSTRAINT = "FK_fa1747f54494a479d3582aa9631";
class ApplicationDocuments1778429441870 {
    name = "ApplicationDocuments1778429441870";
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "application_documents" (
        "id"               uuid             NOT NULL DEFAULT uuid_generate_v4(),
        "applicationId"    uuid             NOT NULL,
        "type"             character varying NOT NULL,
        "url"              character varying NOT NULL,
        "originalFileName" character varying NOT NULL,
        "mimeType"         character varying NOT NULL,
        "fileSize"         integer          NOT NULL,
        "createdAt"             TIMESTAMP   NOT NULL DEFAULT now(),
        "updatedAt"             TIMESTAMP   NOT NULL DEFAULT now(),
        CONSTRAINT "PK_592142aa992e003beadf1409e9e" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "application_documents"
        ADD CONSTRAINT "${APPLICANT_ID_FOREIGN_KEY_CONSTRAINT}"
        FOREIGN KEY ("applicationId")
        REFERENCES "applications"("id")
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "application_documents"
        DROP CONSTRAINT "${APPLICANT_ID_FOREIGN_KEY_CONSTRAINT}"
    `);
        await queryRunner.query(`DROP TABLE "application_documents"`);
    }
}
exports.ApplicationDocuments1778429441870 = ApplicationDocuments1778429441870;
//# sourceMappingURL=1778429441870-application_documents.js.map