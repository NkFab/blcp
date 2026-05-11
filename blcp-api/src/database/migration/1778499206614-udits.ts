import { MigrationInterface, QueryRunner } from "typeorm";

const CONSTRAINTS = {
  PK_AUDITS: "PK_b2d7a2089999197dc7024820f28",
  FK_AUDITS_USER: "FK_d67a69397ddde8ac67f859a726e",
  FK_AUDITS_APPLICATION: "FK_f86fc384bf0c94fe52b89889b96",
  FK_APP_APPROVER: "FK_bc396df6babd2d73f1487cc8eee",
};
export class Audits1778499206614 implements MigrationInterface {
  name = "Audits1778499206614";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'applications'
            AND column_name = 'reviewedById'
        ) AND NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'applications'
            AND column_name = 'reviewerId'
        ) THEN
          ALTER TABLE "applications" RENAME COLUMN "reviewedById" TO "reviewerId";
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'applications'
            AND column_name = 'reviewCompletedAt'
        ) AND NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'applications'
            AND column_name = 'approvedAt'
        ) THEN
          ALTER TABLE "applications" RENAME COLUMN "reviewCompletedAt" TO "approvedAt";
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'applications_reviewrecommendation_enum'
        ) THEN
          CREATE TYPE "public"."applications_reviewrecommendation_enum" AS ENUM (
            'recommended_approval',
            'recommended_rejection',
            'request_more_info'
          );
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_enum
          WHERE enumlabel = 'reviewed'
            AND enumtypid = 'applications_status_enum'::regtype
        ) THEN
          ALTER TYPE "public"."applications_status_enum" ADD VALUE 'reviewed';
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD COLUMN IF NOT EXISTS "reviewComment" character varying
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD COLUMN IF NOT EXISTS "approvalComment" character varying
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD COLUMN IF NOT EXISTS "reviewRecommendation" "public"."applications_reviewrecommendation_enum"
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD COLUMN IF NOT EXISTS "approverId" uuid
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD COLUMN IF NOT EXISTS "approvedAt" TIMESTAMP
    `);
    await queryRunner.query(`
      ALTER TABLE "applications"
      ADD COLUMN IF NOT EXISTS "version" integer NOT NULL DEFAULT 1
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = '${CONSTRAINTS.FK_APP_APPROVER}'
        ) THEN
          ALTER TABLE "applications"
          ADD CONSTRAINT "${CONSTRAINTS.FK_APP_APPROVER}"
          FOREIGN KEY ("approverId")
          REFERENCES "users"("id")
          ON DELETE NO ACTION
          ON UPDATE NO ACTION;
        END IF;
      END $$;
    `);

    await queryRunner.query(
      `CREATE TABLE "audits" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "applicationId" uuid NOT NULL,
        "action" character varying NOT NULL,
        "snapshot" jsonb DEFAULT '{"before":null,"after":null}',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "${CONSTRAINTS.PK_AUDITS}" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE "audits" ADD CONSTRAINT "${CONSTRAINTS.FK_AUDITS_USER}" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "audits" ADD CONSTRAINT "${CONSTRAINTS.FK_AUDITS_APPLICATION}" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT IF EXISTS "${CONSTRAINTS.FK_APP_APPROVER}"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audits" DROP CONSTRAINT "${CONSTRAINTS.FK_AUDITS_APPLICATION}"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audits" DROP CONSTRAINT "${CONSTRAINTS.FK_AUDITS_USER}"`,
    );

    await queryRunner.query(`DROP TABLE "audits"`);
  }
}
