import { MigrationInterface, QueryRunner } from "typeorm";

const CONSTRAINTS = {
  PK_AUDITS: "PK_b2d7a2089999197dc7024820f28",
  FK_AUDITS_USER: "FK_d67a69397ddde8ac67f859a726e",
  FK_AUDITS_APPLICATION: "FK_f86fc384bf0c94fe52b89889b96",
  FK_APP_REVIEWER: "FK_58f1d673e33c609f7aabeb9622f",
};
export class Audits1778499206614 implements MigrationInterface {
  name = "Audits1778499206614";

  public async up(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "${CONSTRAINTS.FK_APP_REVIEWER}" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "${CONSTRAINTS.FK_APP_REVIEWER}"`,
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
