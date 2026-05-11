"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
exports.default = async (datasource) => {
    try {
        const repo = datasource.getRepository(User_1.User);
        const seedUsers = [
            {
                firstName: "Fabrice",
                lastName: "Sup",
                email: "fabrice.supervisor@test.com",
                password: process.env.USER_PASSWORD,
                role: User_1.UserRole.SUPERVISOR,
            },
            {
                firstName: "Eric",
                lastName: "Rev",
                email: "eric.reviewer@test.com",
                password: process.env.USER_PASSWORD,
                role: User_1.UserRole.REVIEWER,
            },
            {
                firstName: "Denis",
                lastName: "App",
                email: "denis.applicant@test.com",
                password: process.env.USER_PASSWORD,
                role: User_1.UserRole.APPLICANT,
            },
        ];
        for (const seedUser of seedUsers) {
            const existingUser = await repo.findOneBy({ email: seedUser.email });
            if (existingUser) {
                continue;
            }
            const user = repo.create(seedUser);
            await repo.save(user);
        }
        console.log("✅ Seeded users");
    }
    catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
};
//# sourceMappingURL=users.seeders.js.map