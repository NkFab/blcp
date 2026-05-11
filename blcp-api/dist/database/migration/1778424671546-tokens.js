"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens1778424671546 = void 0;
const FK_CONSTRAINT = "FK_d417e5d35f2434afc4bd48cb4d2";
class Tokens1778424671546 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "tokens"
        DROP CONSTRAINT "${FK_CONSTRAINT}"
    `);
        await queryRunner.query(`DROP TABLE "tokens"`);
    }
}
exports.Tokens1778424671546 = Tokens1778424671546;
//# sourceMappingURL=1778424671546-tokens.js.map