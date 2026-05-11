import { MigrationInterface, QueryRunner } from "typeorm";

const FK_CONSTRAINT = "FK_d417e5d35f2434afc4bd48cb4d2";

export class Tokens1778424671546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tokens" (
        "id"        uuid        NOT NULL DEFAULT uuid_generate_v4(),
        "token"     character varying NOT NULL,
        "userId"    uuid        NOT NULL,
        "expiresAt" TIMESTAMP   NOT NULL,
        "createdAt" TIMESTAMP   NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP   NOT NULL DEFAULT now(),
        CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id")
      )
    `);

    // --- foreign keys ---
    await queryRunner.query(`
      ALTER TABLE "tokens"
        ADD CONSTRAINT "${FK_CONSTRAINT}"
        FOREIGN KEY ("userId")
        REFERENCES "users"("id")
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "tokens"
        DROP CONSTRAINT "${FK_CONSTRAINT}"
    `);
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
