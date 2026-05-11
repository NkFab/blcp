import { MigrationInterface, QueryRunner } from "typeorm";

const UNIQUE_EMAIL_CONSTRAINT = "UQ_97672ac88f789774dd47f7c8be3";
const PRIMARY_KEY_CONSTRAINT = "PK_a3ffb1c0c8416b9fc6f907b7433";

export class Users1778424666082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."users_role_enum" AS ENUM (
        'applicant',
        'reviewer',
        'approver',
        'supervisor',
        'admin'
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id"        uuid        NOT NULL DEFAULT uuid_generate_v4(),
        "firstName" character varying NOT NULL,
        "lastName"  character varying NOT NULL,
        "email"     character varying NOT NULL,
        "role"      "public"."users_role_enum" NOT NULL DEFAULT 'applicant',
        "password"  character varying NOT NULL,
        "isActive"  boolean     NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP   NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP   NOT NULL DEFAULT now(),
        CONSTRAINT "${UNIQUE_EMAIL_CONSTRAINT}" UNIQUE ("email"),
        CONSTRAINT "${PRIMARY_KEY_CONSTRAINT}" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
