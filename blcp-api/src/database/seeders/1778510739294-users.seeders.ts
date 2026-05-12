import { EntityManager } from "typeorm";
import { User, UserRole } from "../entity/User";

export default async (datasource: EntityManager) => {
  try {
    const repo = datasource.getRepository(User);

    const users = [
      {
        firstName: "Fabrice",
        lastName: "Sup",
        email: "fabrice.supervisor@test.com",
        password: process.env.USER_PASSWORD!,
        role: UserRole.SUPERVISOR,
      },
      {
        firstName: "Eric",
        lastName: "Rev",
        email: "eric.reviewer@test.com",
        password: process.env.USER_PASSWORD!,
        role: UserRole.REVIEWER,
      },
      {
        firstName: "Denis",
        lastName: "App",
        email: "denis.applicant@test.com",
        password: process.env.USER_PASSWORD!,
        role: UserRole.APPLICANT,
      },
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.admin@test.com",
        password: process.env.USER_PASSWORD!,
        role: UserRole.ADMIN,
      },
    ];

    for (const user of users) {
      const existing = await repo.findOne({
        where: { email: user.email },
      });

      if (existing) {
        continue;
      }

      await repo.save(repo.create(user));
    }
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};
