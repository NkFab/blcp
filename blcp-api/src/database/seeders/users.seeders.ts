import { DataSource } from "typeorm";
import { User, UserRole } from "../entity/User";

export default async (datasource: DataSource) => {
  try {
    const repo = datasource.getRepository(User);
    const seedUsers = [
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
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};
