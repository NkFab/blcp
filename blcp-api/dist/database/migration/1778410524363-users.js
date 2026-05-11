"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1778410524363 = void 0;
class Users1778410524363 {
    name = 'Users1778410524363';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.Users1778410524363 = Users1778410524363;
//# sourceMappingURL=1778410524363-users.js.map