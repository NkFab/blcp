import { MigrationInterface, QueryRunner } from "typeorm";

const CONSTRAINTS = {
  FK_APPLICANT_ID: "FK_909867e55cc94e350ae38383cb5",
  FK_REVIEWED_BY_ID: "FK_7d0a19c778d0daf6f76f370c6b4",
  FK_APPROVER_ID: "FK_bc396df6babd2d73f1487cc8eee",
  UQ_REFERENCE_NUMBER: "UQ_3ec039eea588b4eef34c68c30d5",
  PK_ID: "PK_938c0a27255637bde919591888f",
};

export class Applications1778424680754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // creating the enum type before creating the table that uses it
    await queryRunner.query(`
      CREATE TYPE "public"."applications_institutiontype_enum" AS ENUM(
        'commercial_bank',
        'development_bank',
        'cooperative_bank',
        'mortgage_bank'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."applications_licencetype_enum" AS ENUM(
        'commercial_licence',
        'development_bank_licence',
        'microfinance_bank_licence'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."applications_status_enum" AS ENUM(
        'draft',
        'submitted',
        'under_review',
        'reviewed',
        'approved',
        'rejected'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."applications_reviewrecommendation_enum" AS ENUM(
        'recommended_approval',
        'recommended_rejection',
        'request_more_info'
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "applications" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "referenceNumber" character varying NOT NULL,
        "institutionName" character varying NOT NULL,
        "institutionType" "public"."applications_institutiontype_enum" NOT NULL,
        "capitalAmount" numeric(20,2) NOT NULL,
        "licenceType" "public"."applications_licencetype_enum" NOT NULL,
        "status" "public"."applications_status_enum" NOT NULL DEFAULT 'draft',
        "isForeignApplicant" boolean NOT NULL DEFAULT false,
        "isExistingInstitution" boolean NOT NULL DEFAULT false,
        "reviewComment" character varying,
        "approvalComment" character varying,
        "reviewRecommendation" "public"."applications_reviewrecommendation_enum",
        "applicantId" uuid NOT NULL,
        "reviewerId" uuid,
        "approverId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "submittedAt" TIMESTAMP,
        "reviewedAt" TIMESTAMP,
        "approvedAt" TIMESTAMP,
        "version" integer NOT NULL DEFAULT '1',
        CONSTRAINT "${CONSTRAINTS.UQ_REFERENCE_NUMBER}" UNIQUE ("referenceNumber"),
        CONSTRAINT "${CONSTRAINTS.PK_ID}" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD CONSTRAINT "${CONSTRAINTS.FK_APPLICANT_ID}"
      FOREIGN KEY ("applicantId")
      REFERENCES "users"("id")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD CONSTRAINT "${CONSTRAINTS.FK_REVIEWED_BY_ID}"
      FOREIGN KEY ("reviewerId")
      REFERENCES "users"("id")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD CONSTRAINT "${CONSTRAINTS.FK_APPROVER_ID}"
      FOREIGN KEY ("approverId")
      REFERENCES "users"("id")
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "${CONSTRAINTS.FK_APPROVER_ID}"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "${CONSTRAINTS.FK_REVIEWED_BY_ID}"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "${CONSTRAINTS.FK_APPLICANT_ID}"`,
    );
    await queryRunner.query(`DROP TABLE "applications"`);
    await queryRunner.query(
      `DROP TYPE "public"."applications_reviewrecommendation_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."applications_licencetype_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."applications_institutiontype_enum"`,
    );
  }
}
