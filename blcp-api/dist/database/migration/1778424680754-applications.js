"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Applications1778424680754 = void 0;
const APPLICANT_ID_FOREIGN_KEY_CONSTRAINT = "FK_909867e55cc94e350ae38383cb5";
const REVIEWED_BY_ID_FOREIGN_KEY_CONSTRAINT = "FK_7d0a19c778d0daf6f76f370c6b4";
class Applications1778424680754 {
    async up(queryRunner) {
        // creating the enum type before creating the table that uses it
        await queryRunner.query(`
      CREATE TYPE "public"."applications_status_enum" AS ENUM (
        'draft',
        'submitted',
        'under_review',
        'approved',
        'rejected'
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."applications_licencetype_enum" AS ENUM (
        'commercial_licence',
        'development_bank_licence',
        'microfinance_bank_licence'
      )
    `);
        await queryRunner.query(`
      CREATE TYPE "public"."applications_institutiontype_enum" AS ENUM (
        'commercial_bank',
        'development_bank',
        'cooperative_bank',
        'mortgage_bank'
      )
    `);
        await queryRunner.query(`
      CREATE TABLE "applications" (
        "id"                    uuid        NOT NULL DEFAULT uuid_generate_v4(),
        "referenceNumber"       character varying NOT NULL,
        "institutionName"       character varying NOT NULL,
        "institutionType"      "public"."applications_institutiontype_enum" NOT NULL,
        "applicantId"           uuid        NOT NULL,
        "status"                "public"."applications_status_enum" NOT NULL DEFAULT 'draft',
        "reviewedById"          uuid,
        "createdAt"             TIMESTAMP   NOT NULL DEFAULT now(),
        "updatedAt"             TIMESTAMP   NOT NULL DEFAULT now(),
        "submittedAt"           TIMESTAMP,
        "reviewedAt"            TIMESTAMP,
        "reviewCompletedAt"     TIMESTAMP,
        "capitalAmount"         numeric(20,2) NOT NULL,
        "licenceType"           "public"."applications_licencetype_enum" NOT NULL,
        "isForeignApplicant"    boolean     NOT NULL DEFAULT false,
        "isExistingInstitution" boolean     NOT NULL DEFAULT false,
        CONSTRAINT "UQ_3ec039eea588b4eef34c68c30d5" UNIQUE ("referenceNumber"),
        CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id")
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "applications"
        ADD CONSTRAINT "${APPLICANT_ID_FOREIGN_KEY_CONSTRAINT}"
        FOREIGN KEY ("applicantId")
        REFERENCES "users"("id")
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    `);
        await queryRunner.query(`
      ALTER TABLE "applications"
        ADD CONSTRAINT "${REVIEWED_BY_ID_FOREIGN_KEY_CONSTRAINT}"
        FOREIGN KEY ("reviewedById")
        REFERENCES "users"("id")
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    `);
    }
    async down(queryRunner) {
        // dropping foreign key constraints before dropping the table
        await queryRunner.query(`
      ALTER TABLE "applications"
        DROP CONSTRAINT "${REVIEWED_BY_ID_FOREIGN_KEY_CONSTRAINT}"
    `);
        await queryRunner.query(`
      ALTER TABLE "applications"
        DROP CONSTRAINT "${APPLICANT_ID_FOREIGN_KEY_CONSTRAINT}"
    `);
        await queryRunner.query(`DROP TABLE "applications"`);
        // dropping the enum type after dropping the table that uses it
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applications_licencetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applications_institutiontype_enum"`);
    }
}
exports.Applications1778424680754 = Applications1778424680754;
//# sourceMappingURL=1778424680754-applications.js.map